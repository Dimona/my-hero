import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { GameEvent } from '@game/enums/game.enums';
import { InjectStorage } from '@storage/decorators/storage.inject.decorator';
import { Storage } from '@storage/core/storage';
import { Game } from '@game/core/game';
import { PlayerEvent } from '@game/player/enums/player.enums';
import { StorageEvents } from '@storage/enums/storage.enums';
import { Player } from '@game/player/core/player';
import { LevelEvent } from '@game/level/enums/level.enums';

@Injectable()
export class StorageService {
  constructor(@InjectStorage() private readonly storage: Storage, private readonly eventEmitter: EventEmitter2) {}

  @OnEvent(GameEvent.STARTED, { async: false })
  async handleGameStarted(payload: Game): Promise<void> {
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
}
