import { Question, QuestionSet } from 'nest-commander';

export const BATTLE_TURN_INIT_QS = 'battle.turn-init.qs';

export const BATTLE_TURN_INIT = 'battleTurnInit';

export type BattleTurnInitParams = {
  [BATTLE_TURN_INIT]: boolean;
};

@QuestionSet({ name: BATTLE_TURN_INIT_QS })
export class BattleTurnInitQuestions {
  @Question({
    type: 'confirm',
    message: 'Next turn',
    default: 'y',
    name: BATTLE_TURN_INIT,
  })
  parseTurn(value: string): string {
    return value;
  }
}
