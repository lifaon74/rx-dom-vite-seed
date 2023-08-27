import { IObservable, IObservableLike } from '@lirx/core';
import { IFluentSelectValue } from '../fluent-select-function.type';

export interface IFluentObservableSelectEntryValue {
  (): IObservable<string>;
}

export type IFluentObservableSelectEntry = readonly [
  key: IFluentSelectValue,
  value: IFluentObservableSelectEntryValue,
  isDefault?: boolean,
];

export interface IFluentObservableSelectFunction {
  (
    value$: IObservableLike<IFluentSelectValue>,
    entries: readonly IFluentObservableSelectEntry[],
  ): IObservable<string>;
}


