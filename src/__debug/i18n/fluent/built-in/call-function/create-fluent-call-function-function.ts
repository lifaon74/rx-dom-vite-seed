export interface IFluentCallFunctionFunction {
  (
    key: string,
    args: any[],
  ): any;
}

export interface IFluentCallFunctionEntryValue {
  (
    ...args: any[]
  ): any;
}

export type IFluentCallFunctionEntry = readonly [
  key: string,
  value: IFluentCallFunctionEntryValue,
];

export function createFluentCallFunctionFunction(
  entries: Iterable<IFluentCallFunctionEntry>,
): IFluentCallFunctionFunction {
  const map: Map<string, IFluentCallFunctionEntryValue> = new Map<string, IFluentCallFunctionEntryValue>(entries);
  return (
    key: string,
    args: any[],
  ): IFluentCallFunctionEntryValue => {
    if (map.has(key)) {
      return map.get(key)!(...args);
    } else {
      throw new Error(`Missing function: ${JSON.stringify(key)}`);
    }
  };
}
