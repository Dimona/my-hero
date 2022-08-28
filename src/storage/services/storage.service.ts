import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { GameEvents } from '@game/enums/game.enums';
import { InjectStorage } from '@storage/decorators/storage.inject.decorator';
import { Storage } from '@storage/core/storage';
import { Game } from '@game/core/game';

@Injectable()
export class StorageService {
  constructor(@InjectStorage() private readonly storage: Storage, private readonly eventEmitter: EventEmitter2) {}

  @OnEvent(GameEvents.STARTED, { async: false })
  async handleGameStarted(payload: Game): Promise<void> {
    await this.storage.saveGame(payload);

    this.eventEmitter.emit(GameEvents.SAVED);
  }
}
