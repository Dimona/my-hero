import { IScript } from '@game/scenario/interfaces/scenario.interfaces';
import { InquirerService } from 'nest-commander';
import { ConfigService } from '@nestjs/config';
import { PLAYER_QUESTION_SET } from '@game/scenario/scripts/player/player.questions';
import { Injectable, Logger } from '@nestjs/common';
import { PlayerService } from '@game/player/services/player.service';
import { Uuid } from '@game/types/game.types';

@Injectable()
export class PlayerScript implements IScript {
  constructor(
    private readonly configService: ConfigService,
    private readonly inquirer: InquirerService,
    private readonly playerService: PlayerService,
  ) {}

  private async restorePlayer(playerId: Uuid): Promise<void> {
    const player = await this.playerService.restore(playerId);
    const message = player
      ? `Hello ${player.getName()}`
      : `Player with id '${playerId}' was not found. Please correct or delete your env variable value PLAYER_ID`;

    Logger.verbose(message);
  }

  private async createPlayer(): Promise<void> {
    const { playerName } = await this.inquirer.ask<{ playerName: string }>(PLAYER_QUESTION_SET, {
      playerName: undefined,
    });
    // console.log(name);
    const player = await this.playerService.create(playerName);

    Logger.verbose(
      `Your Player id is ${player.getUuid()}. If you will add this value into your env var PLAYER_ID it will be used as permanent player`,
    );
  }

  async run(): Promise<void> {
    const playerId = this.configService.get('PLAYER_ID');
    if (playerId) {
      await this.restorePlayer(playerId);
      return;
    }

    await this.createPlayer();
  }
}
