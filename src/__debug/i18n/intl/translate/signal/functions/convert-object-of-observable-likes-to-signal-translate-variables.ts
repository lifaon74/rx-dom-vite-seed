import { computed, IObservableLike, ISignal, isMaybeObservable, isSignal, signal, toSignal } from '@lirx/core';
import { ITranslateVariableType } from '../../types/translate-function/translate-variables.type';
import { ISignalTranslateVariables } from '../types/translate-function/signal-translate-variables.type';

export type ITranslateVariablesAsObjectOfObservableLikes = Record<string, IObservableLike<ITranslateVariableType>>;

export function convertObjectOfObservableLikesToSignalTranslateVariables(
  variables: ITranslateVariablesAsObjectOfObservableLikes,
): ISignalTranslateVariables {
  const entries: [string, ISignal<ITranslateVariableType>][] = Object.entries(variables)
    .map(([key, value]: [string, IObservableLike<ITranslateVariableType>]): [string, ISignal<ITranslateVariableType>] => {
      return [
        key.endsWith('$')
          ? key.slice(0, -1)
          : key,
        isSignal(value)
          ? value
          : (
            isMaybeObservable(value)
              ? toSignal(value)
              : signal(value)
          ),
      ];
    });

  return computed(() => {
    return Object.fromEntries(
      entries.map(([key, value]: [string, ISignal<ITranslateVariableType>], index: number): [string, ITranslateVariableType] => {
        return [key, value()];
      }),
    );
  });
}
