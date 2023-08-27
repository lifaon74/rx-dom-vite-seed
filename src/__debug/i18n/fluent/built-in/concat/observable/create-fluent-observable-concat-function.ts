import { combineLatest, IObservable, mapDistinct$$, single, switchMap$$, unknownToObservableNotUndefined } from '@lirx/core';
import {
  IFluentObservableDateTimeFormatFunction,
} from '../../call-function/built-in/observable/date-time/fluent-observable-date-time-format-function.type';
import {
  IFluentObservableNumberFormatFunction,
} from '../../call-function/built-in/observable/number/fluent-observable-number-format-function.type';

import { IFluentConcatFunctionListItem } from '../fluent-concat-function.type';
import {
  IFluentObservableConcatFunction,
  IFluentObservableConcatFunctionList,
  IFluentObservableConcatFunctionListItem,
} from './fluent-observable-concat-function.type';

export interface ICreateFluentObservableConcatFunctionOptions {
  fluentNumberFormat: IFluentObservableNumberFormatFunction;
  fluentDateTimeFormat: IFluentObservableDateTimeFormatFunction;
}

export function createFluentObservableConcatFunction(
  options: ICreateFluentObservableConcatFunctionOptions,
): IFluentObservableConcatFunction {
  return (
    list: IFluentObservableConcatFunctionList,
  ): IObservable<string> => {
    return convertFluentObservableConcatFunctionListToObservableOfString(list, options);
  };
}

/*---*/

export function convertFluentObservableConcatFunctionListToObservableOfString(
  list: IFluentObservableConcatFunctionList,
  options: ICreateFluentObservableConcatFunctionOptions,
): IObservable<string> {
  return mapDistinct$$(
    combineLatest(
      list.map((item: IFluentObservableConcatFunctionListItem): IObservable<string> => {
        return convertFluentObservableContactPartToObservableOfString(item, options);
      }),
    ),
    (list: readonly string[]): string => {
      return list.join('');
    },
  );
}

export function convertFluentObservableContactPartToObservableOfString(
  item$: IFluentObservableConcatFunctionListItem,
  options: ICreateFluentObservableConcatFunctionOptions,
): IObservable<string> {
  return switchMap$$(unknownToObservableNotUndefined(item$), (item: IFluentConcatFunctionListItem): IObservable<string> => {
    return convertFluentConcatFunctionListItemToObservableString(item, options);
  });
}

export function convertFluentConcatFunctionListItemToObservableString(
  item: IFluentConcatFunctionListItem,
  {
    fluentNumberFormat,
    fluentDateTimeFormat,
  }: ICreateFluentObservableConcatFunctionOptions,
): IObservable<string> {
  if (typeof item === 'string') {
    return single(item);
  } else if (typeof item === 'number') {
    return fluentNumberFormat(single(item));
  } else if (item instanceof Date) {
    return fluentDateTimeFormat(single(item));
  } else {
    throw new Error(`Invalid type found for concat`);
  }
}
