import { Race } from '@game/hero/hero.enums';
import { HeroCreateParams, HeroRoom, HeroRooms, HeroLocation } from '@game/hero/hero.types';
import { HeroState } from '@game/hero/hero.state';
import { Characteristics } from '@game/common/common.types';
import { Uuid } from '@game/game.types';
import { Utils } from '@common/utils';

export class Hero {
  private state: HeroState;

  private rooms: HeroRooms = {};

  private location: HeroLocation;

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

  addRoom(room: HeroRoom): this {
    this.rooms[`${room.levelRoom.x}|${room.levelRoom.y}`] = room;

    return this;
  }

  getRoomByLocation({ x, y }: HeroLocation): HeroRoom {
    return this.rooms[`${x}|${y}`];
  }

  getRooms(): HeroRooms {
    return this.rooms;
  }

  setLocation(location: HeroLocation): this {
    this.location = location;

    return this;
  }

  getLocation(): HeroLocation {
    return this.location;
  }

  getState(): HeroState {
    return this.state;
  }

  geCharacteristics(): Characteristics {
    return this.state.getState();
  }

  updateCharacteristic(field: keyof Characteristics, value: number): this {
    this.state.updateField(field, value);

    return this;
  }

  applyCharacteristic(field: keyof Characteristics, value: number): this {
    this.state.updateField(field, this.state.getState()[field] + value);

    return this;
  }

  updateCharacteristics(values: { [key in keyof Characteristics]: any }): this {
    this.state.updateFields(values);

    return this;
  }
}
