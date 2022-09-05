import { Question, QuestionSet } from 'nest-commander';
import { BattleAttack } from '@game/scenario/scripts/room-event/battle/battle.enums';

export const BATTLE_ATTACK_QS = 'battle.attack.qs';

export const BATTLE_ATTACK = 'battleAttack';

export type BattleAttackParams = {
  [BATTLE_ATTACK]: BattleAttack;
};

@QuestionSet({ name: BATTLE_ATTACK_QS })
export class BattleAttackQuestions {
  @Question({
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      { name: 'Physical attack', value: BattleAttack.PHYSICAL },
      { name: 'Magical attack', value: BattleAttack.MAGICAL },
    ],
    name: BATTLE_ATTACK,
  })
  parseTurn(value: string): string {
    return value;
  }
}
