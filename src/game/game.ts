import { Uuid } from '@game/game.types';
import { IGame } from '@game/game.interfaces';
import { GameStatus } from '@game/game.enums';
import { Utils } from '@common/utils';
import { Level } from '@game/level/level';

export class Game implements IGame {
  private readonly uuid: Uuid;

  private status: GameStatus = GameStatus.PENDING_START;

  private startedAt: Date;

  private level: Level;

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

  getLevel(): Level {
    return this.level;
  }

  setLevel(level: Level): this {
    this.level = level;

    return this;
  }

  static create(uuid?: Uuid): Game {
    return new Game(uuid);
  }
}
