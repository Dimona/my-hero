import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { GameEvent } from '@game/enums/game.enums';
import { Game } from '@game/core/game';
import { StorageEvents } from '@storage/enums/storage.enums';
import { LevelEvent } from "@game/level/enums/level.enums";

@Injectable()
export class OutputService {
  private readonly logger = new Logger();

  @OnEvent(GameEvent.STARTED, { async: false })
  handleGameStarted(payload: Game) {
    this.logger.verbose(`Game was successfully started, ID: ${payload.getUuid()}`);
  }

  @OnEvent(GameEvent.RESTORED, { async: false })
  handleGameRestored(payload: Game) {
    this.logger.verbose(`Game was successfully restored, ID: ${payload.getUuid()}`);
  }

  @OnEvent(StorageEvents.SAVED, { async: false })
  handleGameSaved(payload: string) {
    this.logger.verbose(`${payload} was successfully saved`);
  }

  @OnEvent(LevelEvent.CREATED, { async: false })
  handleLevelCreated() {
    this.logger.verbose(`New level was successfully generated`);
  }

  @OnEvent(LevelEvent.RESTORED, { async: false })
  handleLevelRestored(payload: Game) {
    this.logger.verbose(`Level was successfully restored`);
  }
}
