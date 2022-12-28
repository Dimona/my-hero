import { ICharacteristicsManager } from '@game/npc/npc.interfaces';
import { BattleAttackAbstract } from '@game/scenario/scripts/room-event/battle/attack/battle.attack.abstract';
import { BattleUtils } from '@game/scenario/scripts/room-event/battle/battle.utils';
import { CharacteristicLabel } from '@game/hero/hero.enums';
import { AUTO_REWARD, RESTORE_MANNA } from '@game/scenario/scripts/room-event/reward/reward.constants';

export class PhysicalAttack extends BattleAttackAbstract {
  constructor(owner: ICharacteristicsManager, opponent: ICharacteristicsManager) {
    super(owner, opponent);
  }

  async run(): Promise<string> {
    const { physicalAttack, manna } = this.owner.getCharacteristics();
    const dice = BattleUtils.throwDice();
    const { physicalDefense } = this.opponent.getCharacteristics();
    let value = physicalAttack + dice - physicalDefense;
    if (value < 0) {
      value = 0;
    }
    let result = `Attacked by '${CharacteristicLabel.physicalAttack}'. Value: ${value}`;
    this.opponent.applyCharacteristic('health', -value);

    this.owner.applyCharacteristic('manna', RESTORE_MANNA);
    result += `\nAttacker recovered '${CharacteristicLabel.manna}'. Value: ${
      this.owner.getCharacteristics().manna - manna
    }\n`;

    return result;
  }
}
