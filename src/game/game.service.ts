import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Game } from '@game/game';
import { GameEvent, GameStatus } from './game.enums';
import { Uuid } from '@game/game.types';
import { InjectStorage } from '@storage/storage.inject.decorator';
import { Storage } from '@storage/storage';
import { LevelService } from '@game/level/level.service';
import { Restorable } from '@game/game.interfaces';

@Injectable()
export class GameService implements Restorable {
  constructor(
    @InjectStorage() private readonly storage: Storage,
    private readonly eventEmitter: EventEmitter2,
    private readonly levelService: LevelService,
  ) {}

  async start(): Promise<Game> {
    const game = Game.create();

    game.setStartedAt(new Date());
    game.setStatus(GameStatus.STARTED);

    await this.eventEmitter.emitAsync(GameEvent.STARTED, game);

    return game;
  }

  async restore(uuid: Uuid): Promise<Game | null> {
    const gameSnapshot = await this.storage.restoreGame(uuid);

    if (!gameSnapshot) {
      return null;
    }

    const game = Game.create(uuid);
    game.setStartedAt(gameSnapshot.startedAt);
    game.setStatus(gameSnapshot.status);

    const level = gameSnapshot.level
      ? await this.levelService.restore(game, gameSnapshot.level)
      : await this.levelService.create(game);

    await this.eventEmitter.emitAsync(GameEvent.RESTORED, game);

    return game;
  }
}
