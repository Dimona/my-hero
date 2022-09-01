import { ClassConstructor } from 'class-transformer';
import { Uuid } from '@game/game.types';
import { GameStatus } from '@game/game.enums';
import { IStorageStrategy } from '@storage/storage.interfaces';
import { StorageStrategyType } from '@storage/storage.enums';
import { HeroRoomStatus, Race } from '@game/hero/hero.enums';
import { Characteristics as TCharacteristics } from '@game/common/common.types';

export type StorageStrategyTyped = ClassConstructor<IStorageStrategy> & { type: StorageStrategyType };

export namespace Snapshot {
  export type Game = {
    uuid: Uuid;
    startedAt: Date;
    status: GameStatus;
    level?: Level;
    hero?: Hero;
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

  export type Hero = {
    uuid: Uuid;
    name: string;
    race: Race;
    x: number;
    y: number;
    rooms: HeroRoom[];
    characteristics: {
      uuid: Uuid;
      data: Characteristics;
    };
  };

  export type HeroRoom = {
    uuid: Uuid;
    status: HeroRoomStatus;
    levelRoom: LevelRoom;
  };

  export type Characteristics = TCharacteristics;
}
