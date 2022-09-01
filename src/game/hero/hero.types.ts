import { HeroRoomStatus, Race } from '@game/hero/hero.enums';
import { Uuid } from '@game/game.types';
import { Room } from '@game/level/level.types';

export type HeroCreateParams = {
  uuid?: Uuid;
  name: string;
  race: Race;
};

export type HeroRoom = {
  uuid: Uuid;
  // event: Event; // TODO: add Event
  status: HeroRoomStatus;
  levelRoom: Room;
};

export type HeroRooms = Record<string, HeroRoom>;

export type HeroLocation = {
  x: number;
  y: number;
};
