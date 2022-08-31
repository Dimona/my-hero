import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { GameEvent } from '@game/game.enums';
import { Game } from '@game/game';
import { StorageEvents } from '@storage/storage.enums';
import { LevelEvent } from '@game/level/level.enums';
import { HeroEvent, RaceLabel } from '@game/hero/hero.enums';
import colors from 'colors';

@Injectable()
export class OutputService {
  @OnEvent(GameEvent.STARTED, { async: false })
  handleGameStarted(payload: Game) {
    Logger.log(`Game was successfully started, ID: ${payload.getUuid()}`);
  }

  @OnEvent(GameEvent.RESTORED, { async: false })
  handleGameRestored(payload: Game) {
    Logger.log(`Game was successfully restored, ID: ${payload.getUuid()}`);
  }

  @OnEvent(StorageEvents.SAVED, { async: false })
  handleGameSaved(payload: string) {
    Logger.log(`${payload} was successfully saved`);
  }

  @OnEvent(LevelEvent.CREATED, { async: false })
  handleLevelCreated() {
    Logger.log(`New level was successfully generated`);
  }

  @OnEvent(LevelEvent.RESTORED, { async: false })
  handleLevelRestored() {
    Logger.log(`Level was successfully restored`);
  }

  @OnEvent(HeroEvent.RESTORED, { async: false })
  handleHeroRestored() {
    Logger.log(`Hero was successfully restored`);
  }

  @OnEvent(HeroEvent.CREATED, { async: false })
  handleHeroCreated() {
    Logger.log(`New hero was successfully created`);
  }
}
