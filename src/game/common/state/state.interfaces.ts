export interface IState<S extends Record<string, any>> {
  updateField<V>(field: keyof S, value: V): this;
  updateFields(values: { [key in keyof S]: any }): this;
  getState(): S;
}
