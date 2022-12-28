import { ChoicesFor, Question, QuestionSet } from 'nest-commander';
import { RoomWalls } from '@game/level/level.types';
import { HeroMove } from '@game/hero/hero.enums';
import { TLocation } from '@game/common/common.types';
import { DEFAULT_LEVEL_HEIGHT, DEFAULT_LEVEL_WIDTH } from '@game/level/level.constants';
import { EXIT_FROM_CAVE } from '@game/scenario/scripts/hero-move/hero-move.constants';

export const HERO_MOVE_QS = 'hero-move.qs';

export const HERO_MOVE = 'heroMove';

export type HeroMoveParams = {
  location: TLocation;
  walls: RoomWalls;
  [HERO_MOVE]: HeroMove | string;
};

@QuestionSet({ name: HERO_MOVE_QS })
export class HeroMoveQuestions {
  @Question({
    type: 'list',
    message: 'Where do you wanna move',
    name: HERO_MOVE,
  })
  parseInit(value: string): string {
    return value;
  }

  @ChoicesFor({
    name: HERO_MOVE,
  })
  parseChoicesForHeroMove({ walls, location }: HeroMoveParams): string[] {
    const result = Object.values(HeroMove).reduce((acc, value) => {
      if (!walls[value]) {
        acc.push(value);
      }

      return acc;
    }, []);
    if (location?.x === DEFAULT_LEVEL_WIDTH - 1 && location?.y === DEFAULT_LEVEL_HEIGHT - 1) {
      result.push(EXIT_FROM_CAVE);
    }

    return result;
  }
}
