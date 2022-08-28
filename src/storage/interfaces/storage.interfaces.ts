import { Game } from '@game/core/game';
import { Uuid } from '@game/types/game.types';
import { GameSnapshot } from '@storage/types/storage.types';

export interface IStorageStrategy {
  saveGame(game: Game): Promise<void>;
  restoreGame(uuid: Uuid): Promise<GameSnapshot>;
}

export interface IStorage extends IStorageStrategy {}
