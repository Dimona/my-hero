import { Game } from '@game/game';
import { Injectable } from '@nestjs/common';
import { IStorageStrategy } from '@storage/interfaces/storage.interfaces';
import { StorageStrategyType } from '@storage/enums/storage.enums';
import { Uuid } from '@game/types/game.types';
import { GameSnapshot } from '@storage/types/storage.types';
import { StorageGameNotFoundError } from '@storage/errors/storage.game.not-found.error';

@Injectable()
export class DefaultStorageStrategy implements IStorageStrategy {
  static readonly type = StorageStrategyType.DEFAULT;

  async saveGame(game: Game): Promise<void> {
    // Do nothing
  }

  async restoreGame(uuid: Uuid): Promise<GameSnapshot> {
    // Do nothing
    throw new StorageGameNotFoundError();
  }
}
