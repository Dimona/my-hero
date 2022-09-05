import { State } from '@game/common/state/state.abstract';
import { Characteristics } from '@game/common/common.types';
import { Uuid } from '@game/game.types';

export class NpcState extends State<Characteristics> {
  protected constructor(uuid?: Uuid) {
    super(uuid);
  }

  static create(uuid?: Uuid): NpcState {
    return new NpcState(uuid);
  }

  protected state: Characteristics = {
    health: 0,
    maxHealth: 0,
    manna: 0,
    maxManna: 0,
    physicalAttack: 0,
    physicalDefense: 0,
    magicalAttack: 0,
    magicalDefense: 0,
  };
}
