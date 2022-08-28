import { GameStatus } from '@game/enums/game.enums';
import { Uuid } from '@game/types/game.types';

export interface IGame {
  setStatus(status: GameStatus): this;
  getStatus(): GameStatus;
  getUuid(): Uuid;
  getStartedAt(): Date;
}
