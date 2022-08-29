import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { GameEvents } from '@game/enums/game.enums';
import { Game } from '@game/core/game';
import { StorageEvents } from '@storage/enums/storage.enums';

@Injectable()
export class OutputService {
  private readonly logger = new Logger();

  @OnEvent(GameEvents.STARTED, { async: false })
  handleGameStarted(payload: Game) {
    this.logger.verbose(`Game was successfully started, ID: ${payload.getUuid()}`);
  }

  @OnEvent(GameEvents.RESTORED, { async: false })
  handleGameRestored(payload: Game) {
    this.logger.verbose(`Game was successfully restored, ID: ${payload.getUuid()}`);
  }

  @OnEvent(StorageEvents.SAVED, { async: false })
  handleGameSaved(payload: string) {
    this.logger.verbose(`${payload} was successfully saved`);
  }
}
