import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { GameEvent } from '@game/game.enums';
import { Game } from '@game/game';
import { StorageEvents } from '@storage/storage.enums';
import { LevelEvent } from '@game/level/level.enums';

@Injectable()
export class OutputService {
  private readonly logger = new Logger();

  @OnEvent(GameEvent.STARTED, { async: false })
  handleGameStarted(payload: Game) {
    this.logger.log(`Game was successfully started, ID: ${payload.getUuid()}`);
  }

  @OnEvent(GameEvent.RESTORED, { async: false })
  handleGameRestored(payload: Game) {
    this.logger.log(`Game was successfully restored, ID: ${payload.getUuid()}`);
  }

  @OnEvent(StorageEvents.SAVED, { async: false })
  handleGameSaved(payload: string) {
    this.logger.log(`${payload} was successfully saved`);
  }

  @OnEvent(LevelEvent.CREATED, { async: false })
  handleLevelCreated() {
    this.logger.log(`New level was successfully generated`);
  }

  @OnEvent(LevelEvent.RESTORED, { async: false })
  handleLevelRestored(payload: Game) {
    this.logger.log(`Level was successfully restored`);
  }
}
