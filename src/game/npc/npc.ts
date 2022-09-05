import { Characteristics, TLocation } from '@game/common/common.types';
import { Uuid } from '@game/game.types';
import { Utils } from '@common/utils';
import { Race } from '@game/npc/npc.enums';
import { ICharacteristicsManager, INpc, IStateManager } from '@game/npc/npc.interfaces';
import { NpcState } from '@game/npc/npc.state';
import { NpcCreateParams } from '@game/npc/npc.types';
import { NpcUtils } from '@game/npc/npc.utils';

export class Npc implements IStateManager<Characteristics>, ICharacteristicsManager, INpc {
  private state: NpcState;

  private constructor(private readonly uuid: Uuid, private readonly name: string, private readonly race: Race) {}

  static create({ name, race }: NpcCreateParams): Npc {
    const npc = new Npc(Utils.generateUuid(), name, race);
    npc.setState(NpcState.create());
    NpcUtils.applyRace(npc, race);

    return npc;
  }

  getUuid(): Uuid {
    return this.uuid;
  }

  getName(): string {
    return this.name;
  }

  getRace(): Race {
    return this.race;
  }

  setState(state: NpcState): this {
    this.state = state;

    return this;
  }

  getState(): NpcState {
    return this.state;
  }

  getCharacteristics(): Characteristics {
    return this.state.getState();
  }

  applyCharacteristic(field: keyof Characteristics, value: number): this {
    const state = this.state.getState();
    let result = state[field] + value;
    if (result < 0) {
      result = 0;
    } else if (field === 'health' && result > state.maxHealth) {
      result = state.maxHealth;
    } else if (field === 'manna' && result > state.maxManna) {
      result = state.maxManna;
    }
    this.state.updateField(field, result);

    return this;
  }

  updateCharacteristics(values: { [key in keyof Characteristics]: number }): this {
    this.state.updateFields(values);

    return this;
  }
}
