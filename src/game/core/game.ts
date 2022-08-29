import { Uuid } from '@game/types/game.types';
import { IGame } from '@game/interfaces/game.interfaces';
import { GameStatus } from '@game/enums/game.enums';
import { Utils } from '@common/utils';

export class Game implements IGame {
  private readonly uuid: Uuid;

  private status: GameStatus = GameStatus.PENDING_START;

  private startedAt: Date;

  private constructor(uuid?: Uuid) {
    this.uuid = uuid || Utils.generateUuid();
  }

  getUuid(): Uuid {
    return this.uuid;
  }

  getStatus(): GameStatus {
    return this.status;
  }

  setStatus(status: GameStatus): this {
    this.status = status;

    return this;
  }

  getStartedAt(): Date {
    return this.startedAt;
  }

  setStartedAt(startedAt: Date): this {
    this.startedAt = startedAt;

    return this;
  }

  static create(uuid?: Uuid): Game {
    return new Game(uuid);
  }
}
