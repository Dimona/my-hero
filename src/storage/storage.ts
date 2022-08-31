import { Game } from '@game/game';
import { IStorage, IStorageStrategy } from './storage.interfaces';
import { Uuid } from '@game/game.types';
import { Player } from '@game/player/player';
import { Snapshot } from '@storage/storage.types';

export class Storage implements IStorage {
  constructor(private readonly strategy: IStorageStrategy) {}

  saveGame(game: Game): Promise<void> {
    return this.strategy.saveGame(game);
  }

  restoreGame(player: Player, uuid: Uuid): Promise<Snapshot.Game> {
    return this.strategy.restoreGame(player, uuid);
  }

  savePlayer(player: Player): Promise<void> {
    return this.strategy.savePlayer(player);
  }

  getPlayer(uuid: Uuid): Promise<Snapshot.Player> {
    return this.strategy.getPlayer(uuid);
  }
}
