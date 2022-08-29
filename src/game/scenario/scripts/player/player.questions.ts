import { Question, QuestionSet } from 'nest-commander';

export const PLAYER_QUESTION_SET = 'player.qs';

@QuestionSet({ name: PLAYER_QUESTION_SET })
export class PlayerQuestions {
  @Question({
    type: 'input',
    message: 'Please enter your name?',
    name: 'playerName',
  })
  parsePlayerName(value: string): string {
    return value;
  }
}
