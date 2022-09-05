import { ICharacteristicsManager } from '@game/npc/npc.interfaces';
import { BattleAttack } from '@game/scenario/scripts/room-event/battle/battle.enums';
import { PhysicalAttack } from '@game/scenario/scripts/room-event/battle/attack/physical.attack';
import { MagicalAttack } from '@game/scenario/scripts/room-event/battle/attack/magical.attack';
import { ClassConstructor } from 'class-transformer';

export interface IBattleAttack {
  getOwner(): ICharacteristicsManager;
  getOpponent(): ICharacteristicsManager;
  run(): Promise<string>;
}

export class BattleAttackFactory {
  private static readonly config: { [key in keyof typeof BattleAttack]: ClassConstructor<IBattleAttack> } = {
    [BattleAttack.PHYSICAL]: PhysicalAttack,
    [BattleAttack.MAGICAL]: MagicalAttack,
  };

  static create(
    owner: ICharacteristicsManager,
    opponent: ICharacteristicsManager,
    attack: BattleAttack,
  ): IBattleAttack {
    return new BattleAttackFactory.config[attack](owner, opponent);
  }
}
