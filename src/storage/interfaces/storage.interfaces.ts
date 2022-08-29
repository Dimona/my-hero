import { Game } from '@game/core/game';
import { Uuid } from '@game/types/game.types';
import { Player } from '@game/player/core/player';
import { Snapshot } from '@storage/types/storage.types';

export interface IStorageStrategy {
  saveGame(game: Game): Promise<void>;
  restoreGame(uuid: Uuid): Promise<Snapshot.Game>;
  savePlayer(player: Player): Promise<void>;
  getPlayer(uuid: Uuid): Promise<Snapshot.Player | null>;
}

export interface IStorage extends IStorageStrategy {}
