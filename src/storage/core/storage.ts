import { Game } from '@game/core/game';
import { IStorage, IStorageStrategy } from '../interfaces/storage.interfaces';
import { Uuid } from '@game/types/game.types';
import { GameSnapshot } from '@storage/types/storage.types';
import { PlayerSnapshot } from '@game/player/types/player.types';
import { Player } from "@game/player/core/player";

export class Storage implements IStorage {
  constructor(private readonly strategy: IStorageStrategy) {}

  saveGame(game: Game): Promise<void> {
    return this.strategy.saveGame(game);
  }

  restoreGame(uuid: Uuid): Promise<GameSnapshot> {
    return this.strategy.restoreGame(uuid);
  }

  savePlayer(player: Player): Promise<void> {
    return this.strategy.savePlayer(player);
  }

  getPlayer(uuid: Uuid): Promise<PlayerSnapshot> {
    return this.strategy.getPlayer(uuid);
  }
}
