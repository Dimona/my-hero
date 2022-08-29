import { Game } from '@game/core/game';
import { IStorage, IStorageStrategy } from '../interfaces/storage.interfaces';
import { Uuid } from '@game/types/game.types';
import { Player } from '@game/player/core/player';
import { Snapshot } from '@storage/types/storage.types';

export class Storage implements IStorage {
  constructor(private readonly strategy: IStorageStrategy) {}

  saveGame(game: Game): Promise<void> {
    return this.strategy.saveGame(game);
  }

  restoreGame(uuid: Uuid): Promise<Snapshot.Game> {
    return this.strategy.restoreGame(uuid);
  }

  savePlayer(player: Player): Promise<void> {
    return this.strategy.savePlayer(player);
  }

  getPlayer(uuid: Uuid): Promise<Snapshot.Player> {
    return this.strategy.getPlayer(uuid);
  }
}
