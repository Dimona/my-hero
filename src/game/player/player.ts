import { Uuid } from '@game/game.types';
import { Utils } from '@common/utils';

export class Player {
  private activeGameId: Uuid;

  constructor(private uuid: Uuid, private name: string) {}

  getUuid(): Uuid {
    return this.uuid;
  }

  getName(): string {
    return this.name;
  }

  setActiveGameId(uuid: string): this {
    this.activeGameId = uuid;

    return this;
  }

  getActiveGameId(): Uuid {
    return this.activeGameId;
  }

  static create({ name, uuid }: { name: string; uuid?: Uuid }): Player {
    return new Player(uuid || Utils.generateUuid(), name);
  }
}
