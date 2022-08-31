import { ChoicesFor, Question, QuestionSet } from 'nest-commander';
import { QuestionList } from '@common/types';
import { Uuid } from '@game/game.types';

export const GAME_INIT_QS = 'game-init.qs';

export enum GameInitValue {
  START = 'start',
  RESTORE = 'restore',
  EXIT = 'exit',
}

export const GAME_INIT = 'gameInit';

export type GameInitParams = {
  gameId: Uuid;
  [GAME_INIT]: GameInitValue;
};

@QuestionSet({ name: GAME_INIT_QS })
export class GameInitQuestions {
  @Question({
    type: 'list',
    message: 'What do you prefer?',
    name: GAME_INIT,
  })
  parseInit(value: string): string {
    return value;
  }

  @ChoicesFor({
    name: GAME_INIT,
  })
  parseChoicesForStartOrRestore({ gameId }: GameInitParams) {
    const result: QuestionList<GameInitValue> = [{ name: 'Start new game', value: GameInitValue.START }];

    if (gameId) {
      result.push({ name: 'Restore the last game', value: GameInitValue.RESTORE });
    }

    result.push({ name: 'Exit', value: GameInitValue.EXIT });

    return result;
  }
}
