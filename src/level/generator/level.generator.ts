import { Utils } from '@utils/utils';
import { DEFAULT_LEVEL_HEIGHT, DEFAULT_LEVEL_WIDTH } from '@level/constants/level.constants';
import { Level } from '@level/types/level.types';

export class LevelGenerator {
  static generate({
    width = DEFAULT_LEVEL_WIDTH,
    height = DEFAULT_LEVEL_HEIGHT,
  }: {
    width: number;
    height: number;
  }): Level {
    const result = <Level>{};
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        result[`${x}|${y}`] = {
          bottom: y === 0 || Utils.randomBoolean(),
          left: x === 0 || Utils.randomBoolean(),
          top: y === height - 1 || Utils.randomBoolean(),
          right: x === width - 1 || Utils.randomBoolean(),
        };
      }
    }

    return result;
  }
}
