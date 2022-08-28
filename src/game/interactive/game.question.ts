import { Question, QuestionSet } from 'nest-commander';
import { GAME } from "@game/constants/game.constants";

@QuestionSet({ name: GAME })
export class GameQuestions {
  @Question({
    type: 'confirm',
    message: 'Do you wanna start the game?',
    name: 'promptedStart',
  })
  parseStart(value: boolean): boolean {
    return value;
  }
}
