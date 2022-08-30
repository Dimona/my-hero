import { Names } from 'fantasy-content-generator';
import { DEFAULT_LEVEL_HEIGHT, DEFAULT_LEVEL_WIDTH } from '@game/level/constants/level.constants';
import { Utils } from '@common/utils';
import { Level } from '@game/level/core/level';
import { LevelParams, LevelRooms, Room, RoomWalls } from '@game/level/types/level.types';

export class LevelGenerator {
  private static isWallsValid(x: number, y: number, walls: RoomWalls): boolean {
    const criticalDoorsCount = x === 0 || y === 0 ? 1 : 2;
    const result = Number(!walls.left) + Number(!walls.top) + Number(!walls.right) + Number(!walls.bottom);

    return result >= criticalDoorsCount;
  }

  private static generateRoomWalls(x: number, y: number, width: number, height: number, rooms: LevelRooms): RoomWalls {
    const walls: RoomWalls = {
      left: y === 0 || rooms[`${x}|${y - 1}`].walls.right,
      top: x === 0 || rooms[`${x - 1}|${y}`].walls.bottom,
      right: y === height - 1 || Utils.randomBoolean(),
      bottom: x === width - 1 || Utils.randomBoolean(),
    };

    if (!LevelGenerator.isWallsValid(x, y, walls)) {
      return LevelGenerator.generateRoomWalls(x, y, width, height, rooms);
    }

    return walls;
  }

  static generate(
    { width = DEFAULT_LEVEL_WIDTH, height = DEFAULT_LEVEL_HEIGHT }: LevelParams = <LevelParams>{},
  ): Level {
    const { name } = Names.generate();
    const level = Level.create({ name: `Cave of ${name}` });
    const rooms: LevelRooms = {};
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
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
  }
}
