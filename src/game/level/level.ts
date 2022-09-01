import { Utils } from '@common/utils';
import { Uuid } from '@game/game.types';
import { LevelRooms, Room } from '@game/level/level.types';

export class Level {
  private rooms: LevelRooms;

  constructor(private readonly uuid: string, private readonly name: string) {}

  static create({ uuid, name }: { uuid?: Uuid; name: string }): Level {
    return new Level(uuid || Utils.generateUuid(), name);
  }

  getUuid(): Uuid {
    return this.uuid;
  }

  getName(): string {
    return this.name;
  }

  setRooms(rooms: LevelRooms): this {
    this.rooms = rooms;

    return this;
  }

  getRooms(): LevelRooms {
    return this.rooms;
  }

  getRoom(x: number, y: number): Room {
    return this.rooms[`${x}|${y}`];
  }
}
