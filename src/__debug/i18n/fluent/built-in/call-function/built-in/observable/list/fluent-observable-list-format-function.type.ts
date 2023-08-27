import { IObservable, IObservableLike } from '@lirx/core';
import { IFluentListFormatFunctionListItem } from '../../list/fluent-list-format-function.type';

export type IFluentObservableListFormatFunctionListItem = IObservableLike<IFluentListFormatFunctionListItem>;

export type IFluentObservableListFormatFunctionList = readonly IFluentObservableListFormatFunctionListItem[];

export type IFluentObservableListFormatFunctionArguments = [
  ...list: IFluentObservableListFormatFunctionList,
  options: Intl.ListFormatOptions | IFluentObservableListFormatFunctionListItem,
];

export interface IFluentObservableListFormatFunction {
  (): IObservable<string>;
  (
    ...args: IFluentObservableListFormatFunctionArguments
  ): IObservable<string>;
}

// export interface IFluentObservableListFormatFunction {
//   (
//     values$: IObservableLike<Iterable<string>>,
//     options?: Intl.ListFormatOptions,
//   ): IObservable<string>;
//
//   (
//     ...values$: readonly IObservableLike<string>[]
//   ): IObservable<string>;
//
//   (
//     ...args: [...values$: readonly IObservableLike<string>[], options: Intl.ListFormatOptions]
//   ): IObservable<string>;
// }
