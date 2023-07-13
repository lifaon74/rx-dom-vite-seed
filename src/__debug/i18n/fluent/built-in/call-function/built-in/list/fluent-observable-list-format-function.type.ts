import { IObservable } from '@lirx/core';
import { IFluentListFormatFunctionItem } from './fluent-list-format-function.type';

export type IObservableFluentListFormatFunctionItem =
  | IFluentListFormatFunctionItem
  | IObservable<IFluentListFormatFunctionItem>
  ;

export type IFluentObservableListFormatFunctionArguments = readonly [
  ...values: readonly IObservableFluentListFormatFunctionItem[],
  options: Intl.ListFormatOptions | IObservableFluentListFormatFunctionItem,
];

export interface IFluentObservableListFormatFunction {
  (
    ...args: IFluentObservableListFormatFunctionArguments
  ): string;
}
