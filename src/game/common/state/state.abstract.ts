import { IState } from '@game/common/state/state.interfaces';
import { Uuid } from '@game/game.types';
import { Utils } from '@common/utils';

export abstract class State<StateType extends Record<string, any>> implements IState<StateType> {
  private readonly uuid: Uuid;

  protected constructor(uuid?: Uuid) {
    this.uuid = uuid || Utils.generateUuid();
  }

  protected state: StateType;

  getUuid(): Uuid {
    return this.uuid;
  }

  updateField<V>(field: keyof StateType, value: V): this {
    // @ts-ignore
    this.state[field] = value;

    return this;
  }

  updateFields(values: { [key in keyof StateType]: any }): this {
    this.state = { ...this.state, ...values };

    return this;
  }

  getState(): StateType {
    return { ...this.state } as StateType;
  }
}
