import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Game } from '@game/core/game';
import { GameEvents, GameStatus } from '../enums/game.enums';
import { Uuid } from '@game/types/game.types';
import { InjectStorage } from '@storage/decorators/storage.inject.decorator';
import { Storage } from '@storage/core/storage';

@Injectable()
export class GameService {
  constructor(@InjectStorage() private readonly storage: Storage, private readonly eventEmitter: EventEmitter2) {}

  async start(): Promise<Game> {
    const game = Game.create();

    game.setStartedAt(new Date());
    game.setStatus(GameStatus.STARTED);

    await this.eventEmitter.emitAsync(GameEvents.STARTED, game);

    return game;
  }

  async restore(uuid: Uuid): Promise<Game | null> {
    const gameSnapshot = await this.storage.restoreGame(uuid);

    if (!gameSnapshot) {
      return null;
    }

    const game = Game.create(uuid);
    game.setStartedAt(gameSnapshot.startedAt);
    game.setStatus(gameSnapshot.status);

    await this.eventEmitter.emitAsync(GameEvents.RESTORED, game);

    return game;
  }
}
