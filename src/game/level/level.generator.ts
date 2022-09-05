import { Names } from 'fantasy-content-generator';
import { DEFAULT_LEVEL_HEIGHT, DEFAULT_LEVEL_WIDTH } from '@game/level/level.constants';
import { Utils } from '@common/utils';
import { Level } from '@game/level/level';
import { LevelParams, LevelRooms, Room, RoomWalls } from '@game/level/level.types';

export class LevelGenerator {
  private static isWallsValid(x: number, y: number, width: number, height: number, walls: RoomWalls): boolean {
    const criticalDoorsCount =
      // (x === 0 && y === 0) ||
      // (x === width - 1 && y === height - 1) ||
      (x === 0 && y === height - 1) || (x === width - 1 && y === 0) ? 1 : 2;
    const result = Number(!walls.left) + Number(!walls.top) + Number(!walls.right) + Number(!walls.bottom);

    return result >= criticalDoorsCount;
  }

  private static generateRoomWalls(x: number, y: number, width: number, height: number, rooms: LevelRooms): RoomWalls {
    const left =
      y === 0 || (rooms[`${x}|${y - 1}`] !== undefined ? rooms[`${x}|${y - 1}`].walls.right : Utils.randomBoolean());
    const top =
      x === 0 || (rooms[`${x - 1}|${y}`] !== undefined ? rooms[`${x - 1}|${y}`].walls.bottom : Utils.randomBoolean());
    const right =
      y === height - 1 ||
      (rooms[`${x}|${y + 1}`] !== undefined ? rooms[`${x}|${y + 1}`].walls.left : Utils.randomBoolean());
    const bottom =
      x === width - 1 ||
      (rooms[`${x + 1}|${y}`] !== undefined ? rooms[`${x + 1}|${y}`].walls.top : Utils.randomBoolean());

    const walls: RoomWalls = { left, top, right, bottom };

    if (!LevelGenerator.isWallsValid(x, y, width, height, walls)) {
      return LevelGenerator.generateRoomWalls(x, y, width, height, rooms);
    }

    return walls;
  }

  static generate(
    { width = DEFAULT_LEVEL_WIDTH, height = DEFAULT_LEVEL_HEIGHT }: LevelParams = <LevelParams>{},
  ): Level {
    try {
      const { name } = Names.generate();
      const level = Level.create({ name: `Cave of ${name}` });
      const rooms: LevelRooms = {};

      rooms[`${0}|${0}`] = {
        uuid: Utils.generateUuid(),
        x: 0,
        y: 0,
        walls: LevelGenerator.generateRoomWalls(0, 0, width, height, rooms),
      };
      rooms[`${width - 1}|${0}`] = {
        uuid: Utils.generateUuid(),
        x: width - 1,
        y: 0,
        walls: LevelGenerator.generateRoomWalls(width - 1, 0, width, height, rooms),
      };
      rooms[`${0}|${height - 1}`] = {
        uuid: Utils.generateUuid(),
        x: 0,
        y: height - 1,
        walls: LevelGenerator.generateRoomWalls(0, height - 1, width, height, rooms),
      };
      rooms[`${width - 1}|${height - 1}`] = {
        uuid: Utils.generateUuid(),
        x: width - 1,
        y: height - 1,
        walls: LevelGenerator.generateRoomWalls(width - 1, height - 1, width, height, rooms),
      };

      for (let x = 1; x < width - 1; x++) {
        rooms[`${x}|${0}`] = {
          uuid: Utils.generateUuid(),
          x,
          y: 0,
          walls: LevelGenerator.generateRoomWalls(x, 0, width, height, rooms),
        };
      }
      for (let x = 1; x < width - 1; x++) {
        rooms[`${x}|${height - 1}`] = {
          uuid: Utils.generateUuid(),
          x,
          y: height - 1,
          walls: LevelGenerator.generateRoomWalls(x, height - 1, width, height, rooms),
        };
      }
      for (let y = 1; y < height - 1; y++) {
        rooms[`${0}|${y}`] = {
          uuid: Utils.generateUuid(),
          x: 0,
          y,
          walls: LevelGenerator.generateRoomWalls(0, y, width, height, rooms),
        };
      }
      for (let y = 1; y < height - 1; y++) {
        rooms[`${width - 1}|${y}`] = {
          uuid: Utils.generateUuid(),
          x: width - 1,
          y,
          walls: LevelGenerator.generateRoomWalls(width - 1, y, width, height, rooms),
        };
      }

      for (let x = 1; x < width - 1; x++) {
        for (let y = 1; y < height - 1; y++) {
          rooms[`${x}|${y}`] = {
            uuid: Utils.generateUuid(),
            x,
            y,
            walls: LevelGenerator.generateRoomWalls(x, y, width, height, rooms),
          };
        }
      }

      level.setRooms(rooms);

      return level;
    } catch (err) {
      return LevelGenerator.generate({ width, height });
    }
  }
}
