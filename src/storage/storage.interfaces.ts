import { Game } from '@game/game';
import { Uuid } from '@game/game.types';
import { Player } from '@game/player/player';
import { Snapshot } from '@storage/storage.types';

export interface IStorageStrategy {
  saveGame(game: Game): Promise<void>;
  restoreGame(player: Player, uuid: Uuid): Promise<Snapshot.Game>;
  savePlayer(player: Player): Promise<void>;
  getPlayer(uuid: Uuid): Promise<Snapshot.Player | null>;
  saveHero(game: Game): Promise<void>;
  deleteGame(game: Game): Promise<void>;
}

export interface IStorage extends IStorageStrategy {}
