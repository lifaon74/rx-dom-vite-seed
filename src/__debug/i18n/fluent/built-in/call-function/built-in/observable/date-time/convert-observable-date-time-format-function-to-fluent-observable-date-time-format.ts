import { IObservable, IObservableLike, unknownToObservableNotUndefined } from '@lirx/core';
import {
  IObservableDateTimeFormatFunction,
} from '../../../../../../intl/date-time/observable/types/observable-date-time-format-function.type';
import { IFluentObservableDateTimeFormatFunction } from './fluent-observable-date-time-format-function.type';

export function convertObservableDateTimeFormatFunctionToFluentObservableDateTimeFormat(
  dateTimeFormat: IObservableDateTimeFormatFunction,
): IFluentObservableDateTimeFormatFunction {
  return (
    value: IObservableLike<Date | number>,
    options?: Partial<Intl.DateTimeFormatOptions>,
  ): IObservable<string> => {
    return dateTimeFormat(
      unknownToObservableNotUndefined(value),
      options,
    );
  };
}

