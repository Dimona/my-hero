import { ClassConstructor } from 'class-transformer';
import { Uuid } from '@game/types/game.types';
import { GameStatus } from '@game/enums/game.enums';
import { IStorageStrategy } from '@storage/interfaces/storage.interfaces';
import { StorageStrategyType } from '@storage/enums/storage.enums';

export type StorageStrategyTyped = ClassConstructor<IStorageStrategy> & { type: StorageStrategyType };

export namespace Snapshot {
  export type Game = {
    uuid: Uuid;
    startedAt: Date;
    status: GameStatus;
    level?: Level;
  };

  export type Player = {
    uuid: Uuid;
    name: string;
    activeGameId?: Uuid;
  };

  export type Level = {
    uuid: Uuid;
    name: string;
    createdAt?: Date;
    rooms: LevelRoom[];
  };

  export type LevelRoom = {
    uuid: Uuid;
    x: number;
    y: number;
    walls: {
      left: boolean;
      top: boolean;
      right: boolean;
      bottom: boolean;
    };
  };
}
