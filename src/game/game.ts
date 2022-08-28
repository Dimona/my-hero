import { GameRestoreParams, Uuid } from '@game/types/game.types';
import { IGame } from '@game/interfaces/game.interfaces';
import { Utils } from '@utils/utils';
import { GameStatus } from '@game/enums/game.enums';
import { Storage } from '@storage/core/storage';

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

  static create(): Game {
    return new Game();
  }

  static start(): Game {
    const instance = new Game();

    instance.startedAt = new Date();
    instance.status = GameStatus.STARTED;

    return instance;
  }

  static async restore(storage: Storage, { uuid }: GameRestoreParams): Promise<Game> {
    const game = await storage.restoreGame(uuid);

    const instance = new Game(uuid);
    instance.startedAt = game.startedAt;
    instance.status = game.status;

    return instance;
  }
}
