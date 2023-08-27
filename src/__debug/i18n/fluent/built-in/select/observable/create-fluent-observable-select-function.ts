import { distinct$$, IObservable, IObservableLike, single, switchMap$$, unknownToObservableNotUndefined } from '@lirx/core';
import {
  IFluentObservablePluralRulesSelectFunction,
} from '../../call-function/built-in/observable/plural-rules/fluent-observable-plural-rules-select-function.type';
import {
  IFluentObservableSelectEntry,
  IFluentObservableSelectEntryValue,
  IFluentObservableSelectFunction,
} from './fluent-observable-select-function.type';
import { IFluentSelectValue } from '../fluent-select-function.type';

export interface ICreateFluentObservableSelectFunctionOptions {
  fluentPluralRulesSelect: IFluentObservablePluralRulesSelectFunction;
}

export function createFluentObservableSelectFunction(
  {
    fluentPluralRulesSelect,
  }: ICreateFluentObservableSelectFunctionOptions,
): IFluentObservableSelectFunction {
  return (
    value$: IObservableLike<IFluentSelectValue>,
    entries: readonly IFluentObservableSelectEntry[],
  ): IObservable<string> => {
    const _value$ = distinct$$(unknownToObservableNotUndefined(value$));

    return distinct$$(
      switchMap$$(_value$, (value: IFluentSelectValue): IObservable<string> => {
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
      }),
    );
  };
}

