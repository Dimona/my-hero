import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Game } from '@game/game';
import { GameEvent, GameStatus } from './game.enums';
import { Uuid } from '@game/game.types';
import { InjectStorage } from '@storage/storage.inject.decorator';
import { Storage } from '@storage/storage';
import { LevelService } from '@game/level/level.service';
import { Restorable } from '@game/game.interfaces';
import { Player } from '@game/player/player';
import { HeroService } from '@game/hero/hero.service';
import { InjectScenario } from '@game/scenario/scenario.inject.decorator';
import { ScriptCollection } from '@game/scenario/script.collection';
import { HeroCreateScript } from '@game/scenario/scripts/hero-create/hero-create.script';
import { HeroMoveScript } from '@game/scenario/scripts/hero-move/hero-move.script';

@Injectable()
export class GameService implements Restorable {
  constructor(
    @InjectStorage() private readonly storage: Storage,
    private readonly eventEmitter: EventEmitter2,
    private readonly levelService: LevelService,
    private readonly heroService: HeroService,
    @InjectScenario() private readonly scenario: ScriptCollection,
    private readonly heroCreateScript: HeroCreateScript,
    private readonly heroMoveScript: HeroMoveScript,
  ) {}

  async start(player: Player): Promise<Game> {
    const game = Game.create();

    game.setStartedAt(new Date());
    game.setStatus(GameStatus.STARTED);
    game.setPlayer(player);

    await this.eventEmitter.emitAsync(GameEvent.STARTED, game);

    return game;
  }

  async restore(player: Player, uuid: Uuid): Promise<Game | null> {
    const gameSnapshot = await this.storage.restoreGame(player, uuid);

    if (!gameSnapshot) {
      return null;
    }

    const game = Game.create(uuid);
    game.setStartedAt(gameSnapshot.startedAt);
    game.setStatus(gameSnapshot.status);
    game.setPlayer(player);

    const level = gameSnapshot.level
      ? await this.levelService.restore(game, gameSnapshot.level)
      : await this.levelService.create(game);

    if (!gameSnapshot.hero) {
      this.scenario.addScript(this.heroCreateScript);
    } else {
      await this.heroService.restore(game, gameSnapshot.hero);
      this.scenario.addScript(this.heroMoveScript);
    }

    await this.eventEmitter.emitAsync(GameEvent.RESTORED, game);

    return game;
  }
}
