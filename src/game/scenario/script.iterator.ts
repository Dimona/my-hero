import { IScript } from '@game/scenario/scenario.interfaces';
import { ScriptCollection } from '@game/scenario/script.collection';

export class ScriptIterator implements IIterator<IScript> {
  private collection: ScriptCollection;

  private position = 0;

  constructor(collection: ScriptCollection) {
    this.collection = collection;
  }

  valid(): boolean {
    return this.position < this.collection.getCount();
  }

  current(): IScript {
    return this.collection.getScripts()[this.position];
  }

  key(): number {
    return this.position;
  }

  next(): IScript {
    const item = this.collection.getScripts()[this.position];
    this.position += 1;

    return item;
  }
}
