import { IObservable, isMaybeObservable, single, switchMap$$, toObservableThrowIfUndefined } from '@lirx/core';
import {
  IFluentObservablePluralRulesSelectFunction,
} from '../call-function/built-in/plural-rules/fluent-observable-plural-rules-select-function.type';
import {
  IFluentObservableSelectEntry,
  IFluentObservableSelectEntryValue,
  IFluentObservableSelectFunction,
} from './fluent-observable-select-function.type';
import { IFluentSelectValue } from './fluent-select-function.type';

export interface ICreateFluentObservableSelectFunctionOptions {
  fluentPluralRulesSelect: IFluentObservablePluralRulesSelectFunction;
}

export function createFluentObservableSelectFunction(
  {
    fluentPluralRulesSelect,
  }: ICreateFluentObservableSelectFunctionOptions,
): IFluentObservableSelectFunction {
  return (
    value$: IObservable<IFluentSelectValue> | IFluentSelectValue,
    entries: readonly IFluentObservableSelectEntry[],
  ): IObservable<string> => {
    return switchMap$$(toObservableThrowIfUndefined(value$), (value: unknown): IObservable<string> => {
      const length: number = entries.length;
      let defaultFnc!: IFluentObservableSelectEntryValue;

      for (let i = 0; i < length; i++) {
        const [key, fnc, isDefault]: IFluentObservableSelectEntry = entries[i];
        if (value === key) {
          return fnc();
        }
        if (isDefault) {
          defaultFnc = fnc;
        }
      }

      if (typeof value === 'number') {
        return switchMap$$(fluentPluralRulesSelect(single(value)), (value: Intl.LDMLPluralRule): IObservable<string> => {
          for (let i = 0; i < length; i++) {
            const [key, fnc]: IFluentObservableSelectEntry = entries[i];
            if (value === key) {
              return fnc();
            }
          }
          return defaultFnc();
        });
      } else {
        return defaultFnc();
      }
    });
  };
}

