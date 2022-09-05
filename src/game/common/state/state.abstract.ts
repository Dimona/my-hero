import { IState } from '@game/common/state/state.interfaces';
import { Uuid } from '@game/game.types';
import { Utils } from '@common/utils';

export abstract class State<TState extends Record<string, any>> implements IState<TState> {
  private readonly uuid: Uuid;

  protected constructor(uuid?: Uuid) {
    this.uuid = uuid || Utils.generateUuid();
  }

  protected state: TState;

  getUuid(): Uuid {
    return this.uuid;
  }

  updateField<V>(field: keyof TState, value: V): this {
    // @ts-ignore
    this.state[field] = value;

    return this;
  }

  updateFields(values: { [key in keyof TState]?: any }): this {
    this.state = { ...this.state, ...values };

    return this;
  }

  getState(): TState {
    return { ...this.state } as TState;
  }
}
