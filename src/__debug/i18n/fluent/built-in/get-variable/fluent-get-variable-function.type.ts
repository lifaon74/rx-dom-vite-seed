export interface IFluentGetVariableFunction {
  (
    key: string,
  ): unknown;
}

export type IFluentGetVariableEntry = readonly [
  key: string,
  value: unknown,
];

