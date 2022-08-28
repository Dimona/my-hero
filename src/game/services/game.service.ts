import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Game } from '@game/game';
import { GameEvents } from '../enums/game.enums';
import { Uuid } from '@game/types/game.types';
import { InjectStorage } from '@storage/decorators/storage.inject.decorator';
import { Storage } from '@storage/core/storage';

@Injectable()
export class GameService {
  constructor(@InjectStorage() private readonly storage: Storage, private readonly eventEmitter: EventEmitter2) {}

  async start(): Promise<Game> {
    const game = Game.start();

    await this.eventEmitter.emitAsync(GameEvents.STARTED, game);

    return game;
  }

  async restore(uuid: Uuid): Promise<Game> {
    const game = await Game.restore(this.storage, { uuid });

    await this.eventEmitter.emitAsync(GameEvents.RESTORED, game);

    return game;
  }
}
