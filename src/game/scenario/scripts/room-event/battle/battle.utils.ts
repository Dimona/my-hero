import { Utils } from '@common/utils';
import { DICE } from '@game/scenario/scripts/room-event/battle/battle.constants';
import { ICharacteristicsManager } from '@game/npc/npc.interfaces';
import { BattleAttack } from '@game/scenario/scripts/room-event/battle/battle.enums';
import { ProbabilityConfig } from '@common/types';

export class BattleUtils {
  static throwDice(): number {
    return Utils.randomIntFromRange(1, DICE);
  }

  static getNpcAttack(npc: ICharacteristicsManager): BattleAttack {
    const { physicalAttack, magicalAttack, manna } = npc.getCharacteristics();
    const total = physicalAttack + magicalAttack;

    if (manna === 0) {
      return BattleAttack.PHYSICAL;
    }

    const config: ProbabilityConfig = [
      {
        value: BattleAttack.PHYSICAL,
        prob: physicalAttack / total,
      },
      {
        value: BattleAttack.MAGICAL,
        prob: magicalAttack / total,
      },
    ];

    return Utils.getRandomFromArrayByProbability(config);
  }

  static resetNpc(npc: ICharacteristicsManager): void {
    const { maxManna, maxHealth } = npc.getCharacteristics();

    npc.updateCharacteristics({ manna: maxManna, health: maxHealth });
  }
}
