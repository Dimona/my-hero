import { IBattleAttack } from '@game/scenario/scripts/room-event/battle/attack/battle.attack.factory';
import { ICharacteristicsManager } from '@game/npc/npc.interfaces';

export abstract class BattleAttackAbstract implements IBattleAttack {
  protected constructor(
    protected readonly owner: ICharacteristicsManager,
    protected readonly opponent: ICharacteristicsManager,
  ) {}

  getOpponent(): ICharacteristicsManager {
    return this.opponent;
  }

  getOwner(): ICharacteristicsManager {
    return this.owner;
  }

  run(): Promise<string> {
    throw new Error('This method has to be implemented');
  }
}
