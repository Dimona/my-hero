import { Uuid } from '@game/game.types';

export type LevelConfig = {
  width: number;
  height: number;
};

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
  x: number;
  y: number;
  walls: RoomWalls;
};

export type LevelRooms = Record<string, Room>;
