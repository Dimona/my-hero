import { Game } from '@game/core/game';
import { Uuid } from '@game/types/game.types';
import { GameSnapshot } from '@storage/types/storage.types';
import { PlayerSnapshot } from '@game/player/types/player.types';
import { Player } from '@game/player/core/player';

export interface IStorageStrategy {
  saveGame(game: Game): Promise<void>;
  restoreGame(uuid: Uuid): Promise<GameSnapshot>;
  savePlayer(player: Player): Promise<void>;
  getPlayer(uuid: Uuid): Promise<PlayerSnapshot | null>;
}

export interface IStorage extends IStorageStrategy {}
