import { default as get } from 'lodash.get';
import { default as set } from 'lodash.set';
import { IContext } from './context.interfaces';

export abstract class ContextAbstract<Storage> implements IContext<Storage> {
  private storage: Partial<Storage> = {};

  get<T = any>(path: string, defaultValue?: T): T {
    return get(this.storage, path, defaultValue);
  }

  set<V = any>(path: string, value: V): this {
    set(this.storage, path, value);

    return this;
  }

  update(values: Partial<Storage>): this {
    this.storage = { ...this.storage, ...values };

    return this;
  }
}
