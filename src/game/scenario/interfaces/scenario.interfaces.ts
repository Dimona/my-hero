export interface IScript {
  run(): Promise<void>;
}

export interface IScriptCollection extends Aggregator<IScript> {
  getScripts(): IScript[];
  getCount(): number;
  addScript(item: IScript): void;
}
