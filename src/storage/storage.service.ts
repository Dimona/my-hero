import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { GameEvent } from '@game/game.enums';
import { InjectStorage } from '@storage/storage.inject.decorator';
import { Storage } from '@storage/storage';
import { Game } from '@game/game';
import { PlayerEvent } from '@game/player/player.enums';
import { StorageEvents } from '@storage/storage.enums';
import { Player } from '@game/player/player';
import { LevelEvent } from '@game/level/level.enums';
import { HeroEvent } from '@game/hero/hero.enums';
import { RoomEventEvent } from '@game/scenario/scripts/room-event/room-event.enums';

@Injectable()
export class StorageService {
  constructor(@InjectStorage() private readonly storage: Storage, private readonly eventEmitter: EventEmitter2) {}

  @OnEvent(GameEvent.CREATED, { async: false })
  async handleGameStarted(payload: Game): Promise<void> {
    await this.storage.saveGame(payload);

    this.eventEmitter.emit(GameEvent.STARTED, payload);
    this.eventEmitter.emit(StorageEvents.SAVED, 'game');
  }

  @OnEvent(GameEvent.UPDATED, { async: false })
  async handleGameUpdated(payload: Game): Promise<void> {
    await this.storage.saveGame(payload);

    this.eventEmitter.emit(StorageEvents.SAVED, 'game');
  }

  @OnEvent(PlayerEvent.UPSERTED, { async: false })
  async handlePlayerUpserted(payload: Player): Promise<void> {
    await this.storage.savePlayer(payload);

    this.eventEmitter.emit(StorageEvents.SAVED, 'player');
  }

  @OnEvent(LevelEvent.CREATED, { async: false })
  async handleLevelCreated(payload: Game): Promise<void> {
    await this.storage.saveGame(payload);

    this.eventEmitter.emit(StorageEvents.SAVED, 'game');
  }

  @OnEvent(HeroEvent.CREATED, { async: false })
  async handleHeroCreated(payload: Game): Promise<void> {
    await this.storage.saveGame(payload);

    this.eventEmitter.emit(StorageEvents.SAVED, 'game');
  }

  @OnEvent(HeroEvent.UPDATED, { async: false })
  async handleHeroUpdated(payload: Game): Promise<void> {
    await this.storage.saveHero(payload);
  }

  @OnEvent(RoomEventEvent.PASSED, { async: false })
  async handleRoomPassed(payload: Game): Promise<void> {
    await this.storage.saveHero(payload);
  }

  @OnEvent(HeroEvent.DEAD, { async: false })
  async handleHeroDead(payload: Game): Promise<void> {
    await this.storage.deleteGame(payload);
  }

  @OnEvent(GameEvent.FINISHED, { async: false })
  async handleGameFinished(payload: Game): Promise<void> {
    await this.storage.deleteGame(payload);
  }
}
