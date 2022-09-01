import { Question, QuestionSet } from 'nest-commander';

export const GAME_START_QS = 'game-start.qs';

export const PROMPTED_START = 'promptedStart';

export type GameStartParams = {
  [PROMPTED_START]: boolean;
};

@QuestionSet({ name: GAME_START_QS })
export class GameStartQuestions {
  @Question({
    type: 'confirm',
    message: 'Do you wanna start the game?',
    default: true,
    name: PROMPTED_START,
  })
  parseStart(value: boolean): boolean {
    return value;
  }
}
