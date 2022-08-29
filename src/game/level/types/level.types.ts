import { Uuid } from '@game/types/game.types';

export type LevelParams = {
  width: number;
  height: number;
};

export type RoomWalls = {
  top: boolean;
  left: boolean;
  bottom: boolean;
  right: boolean;
};

export type Room = {
  uuid: Uuid;
  walls: RoomWalls;
};

export type LevelRooms = Map<[number, number], Room>;
