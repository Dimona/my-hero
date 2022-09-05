import { HeroRoomStatus } from '@game/hero/hero.enums';
import { Uuid } from '@game/game.types';
import { Room } from '@game/level/level.types';
import { NpcCreateParams } from '@game/npc/npc.types';

export type HeroCreateParams = NpcCreateParams & {
  uuid?: Uuid;
};

export type HeroRoom = {
  uuid: Uuid;
  // event: Event; // TODO: add Event
  status: HeroRoomStatus;
  levelRoom: Room;
};

export type HeroRooms = Record<string, HeroRoom>;
