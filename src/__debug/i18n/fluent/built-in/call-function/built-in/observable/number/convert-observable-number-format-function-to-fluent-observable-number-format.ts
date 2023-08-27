import { IObservable, IObservableLike, unknownToObservableNotUndefined } from '@lirx/core';
import { IObservableNumberFormatFunction } from '../../../../../../intl/number/observable/types/observable-number-format-function.type';
import { IFluentObservableNumberFormatFunction } from './fluent-observable-number-format-function.type';

export function convertObservableNumberFormatFunctionToFluentObservableNumberFormat(
  numberFormat: IObservableNumberFormatFunction,
): IFluentObservableNumberFormatFunction {
  return (
    value: IObservableLike<number>,
    options?: Partial<Intl.NumberFormatOptions>,
  ): IObservable<string> => {
    return numberFormat(
      unknownToObservableNotUndefined(value),
      options,
    );
  };
}

