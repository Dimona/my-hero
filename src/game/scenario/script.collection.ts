import { IScript, IScriptCollection } from '@game/scenario/scenario.interfaces';
import { ScriptIterator } from '@game/scenario/script.iterator';

export class ScriptCollection implements IScriptCollection {
  private scripts: IScript[] = [];

  public getScripts(): IScript[] {
    return this.scripts;
  }

  public getCount(): number {
    return this.scripts.length;
  }

  public addScript(script: IScript): this {
    this.scripts.push(script);

    return this;
  }

  getIterator(): IIterator<IScript> {
    return new ScriptIterator(this);
  }
}
