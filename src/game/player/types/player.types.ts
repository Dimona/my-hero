import { Uuid } from '@game/types/game.types';

export type PlayerSnapshot = {
  uuid: Uuid;
  name: string;
  activeGameId?: Uuid;
};

export type PlayerRestoreParams = {
  uuid: Uuid;
};
