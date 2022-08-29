import { GameStatus } from '@game/enums/game.enums';
import { Uuid } from '@game/types/game.types';

export interface IGame {
  getUuid(): Uuid;
  setStatus(status: GameStatus): this;
  getStatus(): GameStatus;
  setStartedAt(startedAt: Date): this;
  getStartedAt(): Date;
}
