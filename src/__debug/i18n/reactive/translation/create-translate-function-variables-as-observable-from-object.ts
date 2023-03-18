import { combineLatest, debounceMicrotaskObservable, distinctObservable, IObservable, mapObservable } from '@lirx/core';
import {
  ITranslateFunctionVariablesAsObject,
  ITranslateFunctionVariablesAsObservable,
  ITranslateFunctionVariablesAsObservableValue,
} from './translate-function.type';

export function createTranslateFunctionVariablesAsObservableFromObject(
  variables: ITranslateFunctionVariablesAsObject,
): ITranslateFunctionVariablesAsObservable {
  const entries: [string, IObservable<unknown>][] = Object.entries(variables);

  const keys: string[] = entries.map(([key]): string => {
    return (key.endsWith('$'))
      ? key.slice(0, -1)
      : key;
  });

  const values: IObservable<unknown>[] = entries.map(([, value]): IObservable<unknown> => {
    return value;
  });

  return distinctObservable(
    mapObservable(
      debounceMicrotaskObservable(combineLatest(values)),
      (values: readonly unknown[]): ITranslateFunctionVariablesAsObservableValue => {
        return values.map((value: unknown, index: number): [string, unknown] => {
          return [keys[index], value];
        });
      },
    ),
  );
}
