import { IObservable, IObservableLike, unknownToObservableNotUndefined } from '@lirx/core';
import {
  IObservablePluralRulesSelectFunction,
} from '../../../../../../intl/plural-rules/observable/types/observable-plural-rules-select-function.type';
import { IFluentObservablePluralRulesSelectFunction } from './fluent-observable-plural-rules-select-function.type';

export function convertObservablePluralRulesSelectFunctionToFluentObservablePluralRulesSelect(
  pluralRulesSelect: IObservablePluralRulesSelectFunction,
): IFluentObservablePluralRulesSelectFunction {
  return (
    value: IObservableLike<number>,
    options?: Partial<Intl.PluralRulesOptions>,
  ): IObservable<Intl.LDMLPluralRule> => {
    return pluralRulesSelect(
      unknownToObservableNotUndefined(value),
      options,
    );
  };
}

