import { Uuid } from '@game/game.types';

export type PlayerRestoreParams = {
  uuid: Uuid;
};

export type PlayerCreateParams = {
  name: string;
  uuid?: Uuid;
};
