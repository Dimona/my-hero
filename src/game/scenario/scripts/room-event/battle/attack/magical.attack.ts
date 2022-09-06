import { ICharacteristicsManager } from '@game/npc/npc.interfaces';
import { BattleAttackAbstract } from '@game/scenario/scripts/room-event/battle/attack/battle.attack.abstract';
import { BattleUtils } from '@game/scenario/scripts/room-event/battle/battle.utils';
import { CharacteristicLabel } from '@game/hero/hero.enums';

export class MagicalAttack extends BattleAttackAbstract {
  constructor(owner: ICharacteristicsManager, opponent: ICharacteristicsManager) {
    super(owner, opponent);
  }

  async run(): Promise<string> {
    const { magicalAttack, manna } = this.owner.getCharacteristics();
    const dice = BattleUtils.throwDice();
    const { magicalDefense } = this.opponent.getCharacteristics();
    let value = magicalAttack + dice - magicalDefense;
    if (value < 0) {
      value = 0;
    }
    const mannaValue = Math.min(manna, Math.ceil(value / 2));
    value = mannaValue * 2;
    let result = `Attacked by '${CharacteristicLabel.magicalAttack}'. Value: ${value}`;
    result += `\nAttacker lost '${CharacteristicLabel.manna}'. Value: ${mannaValue}\n`;

    this.opponent.applyCharacteristic('health', -value);
    this.owner.applyCharacteristic('manna', -mannaValue);

    return result;
  }
}
