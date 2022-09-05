import { HeroCreateParams, HeroRoom, HeroRooms } from '@game/hero/hero.types';
import { HeroState } from '@game/hero/hero.state';
import { Characteristics, TLocation } from '@game/common/common.types';
import { Uuid } from '@game/game.types';
import { Utils } from '@common/utils';
import { Race } from '@game/npc/npc.enums';
import { ILocation } from '@game/hero/hero.interfaces';
import { ICharacteristicsManager, INpc, IStateManager } from '@game/npc/npc.interfaces';

export class Hero implements ILocation, IStateManager<Characteristics>, ICharacteristicsManager, INpc {
  private state: HeroState;

  private rooms: HeroRooms = {};

  private location: TLocation;

  private constructor(private readonly uuid: Uuid, private readonly name: string, private readonly race: Race) {}

  static create({ uuid, name, race }: HeroCreateParams): Hero {
    return new Hero(uuid || Utils.generateUuid(), name, race);
  }

  getUuid(): Uuid {
    return this.uuid;
  }

  getName(): string {
    return this.name;
  }

  getRace(): Race {
    return this.race;
  }

  setState(state: HeroState): this {
    this.state = state;

    return this;
  }

  getState(): HeroState {
    return this.state;
  }

  addRoom(room: HeroRoom): this {
    this.rooms[`${room.levelRoom.x}|${room.levelRoom.y}`] = room;

    return this;
  }

  getRoomByLocation({ x, y }: TLocation): HeroRoom {
    return this.rooms[`${x}|${y}`];
  }

  getRooms(): HeroRooms {
    return this.rooms;
  }

  setLocation(location: TLocation): this {
    this.location = location;

    return this;
  }

  getLocation(): TLocation {
    return this.location;
  }

  getCharacteristics(): Characteristics {
    return this.state.getState();
  }

  applyCharacteristic(field: keyof Characteristics, value: number): this {
    const state = this.state.getState();
    let result = state[field] + value;
    if (result < 0) {
      result = 0;
    } else if (field === 'health' && result > state.maxHealth) {
      result = state.maxHealth;
    } else if (field === 'manna' && result > state.maxManna) {
      result = state.maxManna;
    }
    this.state.updateField(field, result);

    return this;
  }

  updateCharacteristics(values: { [key in keyof Characteristics]?: number }): this {
    this.state.updateFields(values);

    return this;
  }
}
