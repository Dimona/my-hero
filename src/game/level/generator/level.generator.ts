import { Names } from 'fantasy-content-generator';
import { DEFAULT_LEVEL_HEIGHT, DEFAULT_LEVEL_WIDTH } from '@game/level/constants/level.constants';
import { Utils } from '@common/utils';
import { Level } from '@game/level/core/level';
import { LevelParams, LevelRooms, Room } from '@game/level/types/level.types';

export class LevelGenerator {
  static generate(
    { width = DEFAULT_LEVEL_WIDTH, height = DEFAULT_LEVEL_HEIGHT }: LevelParams = <LevelParams>{},
  ): Level {
    const { name } = Names.generate();
    const level = Level.create({ name: `Cave of ${name}` });
    const rooms: LevelRooms = new Map<[number, number], Room>();
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        rooms.set([x, y], {
          uuid: Utils.generateUuid(),
          walls: {
            bottom: y === 0 || Utils.randomBoolean(),
            left: x === 0 || Utils.randomBoolean(),
            top: y === height - 1 || Utils.randomBoolean(),
            right: x === width - 1 || Utils.randomBoolean(),
          },
        });
      }
    }

    level.setRooms(rooms);

    return level;
  }
}
