import { ChoicesFor, Question, QuestionSet } from 'nest-commander';
import { RoomWalls } from '@game/level/level.types';
import { HeroMove } from '@game/hero/hero.enums';

export const HERO_MOVE_QS = 'hero-move.qs';

export const HERO_MOVE = 'heroMove';

export type HeroMoveParams = {
  walls: RoomWalls;
  [HERO_MOVE]: HeroMove;
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
  parseChoicesForHeroMove({ walls }: HeroMoveParams): string[] {
    return Object.values(HeroMove).reduce((acc, value) => {
      if (!walls[value]) {
        acc.push(value);
      }

      return acc;
    }, []);
  }
}
