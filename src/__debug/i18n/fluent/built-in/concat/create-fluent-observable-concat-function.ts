import { function$$, IObservable, isMaybeObservable, single, switchMap$$ } from '@lirx/core';
import {
  IFluentObservableDateTimeFormatFunction,
} from '../call-function/built-in/date-time/fluent-observable-date-time-format-function.type';
import { IFluentObservableNumberFormatFunction } from '../call-function/built-in/number/fluent-observable-number-format-function.type';
import { IFluentConcatPart } from './create-fluent-concat-function';

export type IFluentObservableConcatPart =
  | IFluentConcatPart
  | IObservable<IFluentConcatPart>
  ;

export interface IFluentObservableConcatFunction {
  (
    parts: readonly IFluentObservableConcatPart[],
  ): IObservable<string>;
}

export interface ICreateFluentObservableConcatFunctionOptions {
  fluentNumberFormat: IFluentObservableNumberFormatFunction;
  fluentDateTimeFormat: IFluentObservableDateTimeFormatFunction;
}

export function createFluentObservableConcatFunction(
  options: ICreateFluentObservableConcatFunctionOptions,
): IFluentObservableConcatFunction {
  return (
    parts: readonly IFluentObservableConcatPart[],
  ): IObservable<string> => {
    const observables: IObservable<string>[] = parts.map((part: IFluentObservableConcatPart): IObservable<string> => {
      return convertFluentObservableContactPartToObservableOfString(part, options);
    });

    return function$$(
      observables,
      (...parts: string[]): string => {
        return parts.join('');
      },
    );
  };
}

/*----*/

function convertFluentObservableContactPartToObservableOfString(
  input: IFluentObservableConcatPart,
  {
    fluentNumberFormat,
    fluentDateTimeFormat,
  }: ICreateFluentObservableConcatFunctionOptions,
): IObservable<string> {
  if (typeof input === 'string') {
    return single(input);
  } else if (typeof input === 'number') {
    return fluentNumberFormat(single(input));
  } else if (input instanceof Date) {
    return fluentDateTimeFormat(single(input));
  } else if (isMaybeObservable(input)) {
    return switchMap$$(input, (value: IFluentConcatPart): IObservable<string> => {
      return convertFluentObservableContactPartToObservableOfString(value, {
        fluentNumberFormat,
        fluentDateTimeFormat,
      });
    });
  } else {
    return single(String(input));
  }
}
