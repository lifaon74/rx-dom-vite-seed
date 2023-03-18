import { IFluentGetVariableEntry, IFluentGetVariableFunction } from './fluent-get-variable-function.type';

export function createFluentGetVariableFunction(
  entries: Iterable<IFluentGetVariableEntry>,
): IFluentGetVariableFunction {
  const map: Map<string, unknown> = new Map<string, unknown>(entries);
  return (
    key: string,
  ): unknown => {
    if (map.has(key)) {
      return map.get(key)!;
    } else {
      throw new Error(`Missing variable: ${JSON.stringify(key)}`);
    }
  };
}
