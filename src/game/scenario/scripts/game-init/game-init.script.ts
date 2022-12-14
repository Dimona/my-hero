import { IScript } from '@game/scenario/scenario.interfaces';
import { InquirerService } from 'nest-commander';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Injectable, Logger } from '@nestjs/common';
import {
  GAME_INIT,
  GAME_INIT_QS,
  GameInitParams,
  GameInitValue,
} from '@game/scenario/scripts/game-init/game-init.questions';
import { Context } from '@context/context';
import { GameService } from '@game/game.service';
import { Player } from '@game/player/player';
import { Uuid } from '@game/game.types';
import { GAME_START_QS, GameStartParams, PROMPTED_START } from '@game/scenario/scripts/game-init/game-start.questions';
import { InjectScenario } from '@game/scenario/scenario.inject.decorator';
import { ScriptCollection } from '@game/scenario/script.collection';
import { HeroCreateScript } from '@game/scenario/scripts/hero-create/hero-create.script';

@Injectable()
export class GameInitScript implements IScript {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly inquirer: InquirerService,
    private readonly gameService: GameService,
    private readonly context: Context,
    @InjectScenario() private readonly scenario: ScriptCollection,
    private readonly heroCreateScript: HeroCreateScript,
  ) {}

  async run(): Promise<void> {
    let gameId: Uuid = null;
    const player = this.context.get<Player>('player');
    if (player) {
      gameId = player.getActiveGameId();
    }

    const { gameInit } = await this.inquirer.ask<GameInitParams>(GAME_INIT_QS, {
      [GAME_INIT]: undefined,
      gameId,
    });

    switch (gameInit) {
      case GameInitValue.START:
        await this.gameService.start(player);
        this.scenario.addScript(this.heroCreateScript);
        break;

      case GameInitValue.RESTORE:
        if (gameId) {
          let game = await this.gameService.restore(player, gameId);
          if (!game) {
            Logger.error('Something went wrong during restore');

            const { promptedStart } = await this.inquirer.ask<GameStartParams>(GAME_START_QS, {
              [PROMPTED_START]: undefined,
            });
            if (!promptedStart) {
              return this.exit();
            }

            game = await this.gameService.start(player);
            this.scenario.addScript(this.heroCreateScript);
            break;
          }
        }
        break;

      case GameInitValue.EXIT:
        this.exit();
        break;
    }
  }

  private exit(): void {
    Logger.warn('Goodbye');
  }
}
