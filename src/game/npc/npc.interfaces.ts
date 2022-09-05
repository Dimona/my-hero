import { Characteristics } from '@game/common/common.types';
import { Uuid } from '@game/game.types';
import { IState } from '@game/common/state/state.interfaces';
import { Race } from '@game/npc/npc.enums';

export interface ICharacteristicsManager {
  getCharacteristics(): Characteristics;
  applyCharacteristic(field: keyof Characteristics, value: number): this;
  updateCharacteristics(values: { [key in keyof Characteristics]?: number }): this;
}

export interface INpc {
  getUuid(): Uuid;
  getName(): string;
  getRace(): Race;
}

export interface IStateManager<TState> {
  setState(state: IState<TState>): this;
  getState(): IState<TState>;
}
