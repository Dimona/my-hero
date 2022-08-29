import { Game } from '@game/core/game';
import { Injectable } from '@nestjs/common';
import { IStorageStrategy } from '@storage/interfaces/storage.interfaces';
import { StorageStrategyType } from '@storage/enums/storage.enums';
import { Uuid } from '@game/types/game.types';
import { GameSnapshot } from '@storage/types/storage.types';
import { StorageGameNotFoundError } from '@storage/errors/storage.game.not-found.error';
import { PlayerSnapshot } from '@game/player/types/player.types';
import { Player } from "@game/player/core/player";

@Injectable()
export class DefaultStorageStrategy implements IStorageStrategy {
  static readonly type = StorageStrategyType.DEFAULT;

  async saveGame(game: Game): Promise<void> {
    // Do nothing
  }

  restoreGame(uuid: Uuid): Promise<GameSnapshot> {
    // Do nothing
    throw new StorageGameNotFoundError();
  }

  async savePlayer(player: Player): Promise<void> {
    // Do nothing
  }

  getPlayer(uuid: Uuid): Promise<PlayerSnapshot> {
    return null;
  }
}
