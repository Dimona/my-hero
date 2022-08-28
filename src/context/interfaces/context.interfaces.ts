export interface IContext<Storage extends Record<string, any>> {
  set<V = any>(path: string, value: V): this;
  get<T = any>(path: string): T;
  update(values: Partial<Storage>): this;
}