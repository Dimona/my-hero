import { Game } from '@game/game';
import { IStorage, IStorageStrategy } from '../interfaces/storage.interfaces';
import { Uuid } from '@game/types/game.types';
import { GameSnapshot } from '@storage/types/storage.types';

export class Storage implements IStorage {
  constructor(private readonly strategy: IStorageStrategy) {}

  saveGame(game: Game): Promise<void> {
    return this.strategy.saveGame(game);
  }

  restoreGame(uuid: Uuid): Promise<GameSnapshot> {
    return this.strategy.restoreGame(uuid);
  }
}
