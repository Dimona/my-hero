import { Race } from '@game/hero/hero.enums';
import { HeroCreateParams } from '@game/hero/hero.types';
import { HeroState } from '@game/hero/hero.state';
import { Characteristics } from '@game/common/common.types';
import { Uuid } from '@game/game.types';
import { Utils } from '@common/utils';

export class Hero {
  private state: HeroState;

  private constructor(private readonly uuid: Uuid, private readonly name: string, private readonly race: Race) {}

  static create({ uuid, name, race }: HeroCreateParams): Hero {
    return new Hero(uuid || Utils.generateUuid(), name, race);
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

  setState(state: HeroState): this {
    this.state = state;

    return this;
  }

  getState(): HeroState {
    return this.state;
  }

  geCharacteristics(): Characteristics {
    return this.state.getState();
  }

  updateCharacteristic<V>(field: keyof Characteristics, value: V): this {
    this.state.updateField(field, value);

    return this;
  }

  updateCharacteristics(values: { [key in keyof Characteristics]: any }): this {
    this.state.updateFields(values);

    return this;
  }
}
