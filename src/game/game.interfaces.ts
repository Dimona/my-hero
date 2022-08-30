import { GameStatus } from '@game/game.enums';
import { Uuid } from '@game/game.types';

export interface Creatable {
  create(...args: any): Promise<any>;
}

export interface Restorable {
  restore(...args: any): Promise<any>;
}

export interface IGame {
  getUuid(): Uuid;
  setStatus(status: GameStatus): this;
  getStatus(): GameStatus;
  setStartedAt(startedAt: Date): this;
  getStartedAt(): Date;
}
