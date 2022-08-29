import { Game } from '@game/core/game';
import { Injectable } from '@nestjs/common';
import { IStorageStrategy } from '@storage/interfaces/storage.interfaces';
import { StorageStrategyType } from '@storage/enums/storage.enums';
import { Uuid } from '@game/types/game.types';
import { Snapshot } from '@storage/types/storage.types';
import { StorageGameNotFoundError } from '@storage/errors/storage.game.not-found.error';
import { Player } from '@game/player/core/player';

@Injectable()
export class DefaultStorageStrategy implements IStorageStrategy {
  static readonly type = StorageStrategyType.DEFAULT;

  async saveGame(game: Game): Promise<void> {
    // Do nothing
  }

  restoreGame(uuid: Uuid): Promise<Snapshot.Game> {
    // Do nothing
    throw new StorageGameNotFoundError();
  }

  async savePlayer(player: Player): Promise<void> {
    // Do nothing
  }

  getPlayer(uuid: Uuid): Promise<Snapshot.Player | null> {
    return null;
  }
}
