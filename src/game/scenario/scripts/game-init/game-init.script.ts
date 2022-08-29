import { IScript } from '@game/scenario/interfaces/scenario.interfaces';
import { InquirerService } from 'nest-commander';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import {
  GAME_INIT,
  GAME_INIT_QS,
  GameInitParams,
  GameInitValue,
} from '@game/scenario/scripts/game-init/game-init.questions';
import { Context } from '@context/context';
import { GameService } from '@game/services/game.service';
import { Player } from '@game/player/core/player';
import { Uuid } from '@game/types/game.types';
import { GAME_START_QS, GameStartParams, PROMPTED_START } from '@game/scenario/scripts/game-init/game-start.questions';

@Injectable()
export class GameInitScript implements IScript {
  constructor(
    private readonly configService: ConfigService,
    private readonly eventEmitter: EventEmitter2,
    private readonly inquirer: InquirerService,
    private readonly gameService: GameService,
    private readonly context: Context,
  ) {}

  exit(): void {
    Logger.verbose('GoodBy');
  }

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
        await this.gameService.start();
        break;

      case GameInitValue.RESTORE:
        if (gameId) {
          const game = await this.gameService.restore(gameId);
          if (!game) {
            Logger.verbose('Something went wrong during restore');

            const { promptedStart } = await this.inquirer.ask<GameStartParams>(GAME_START_QS, {
              [PROMPTED_START]: undefined,
            });
            if (!promptedStart) {
              return this.exit();
            }

            await this.gameService.start();
          }
        }
        break;

      case GameInitValue.EXIT:
        this.exit();
        break;
    }
  }
}
