import { Uuid } from '@game/game.types';
import { Utils } from '@common/utils';
import { PlayerCreateParams } from '@game/player/player.types';

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

  static create({ name, uuid }: PlayerCreateParams): Player {
    return new Player(uuid || Utils.generateUuid(), name);
  }
}
