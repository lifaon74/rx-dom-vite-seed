import { IObservable } from '@lirx/core';
import { IFluentSelectValue } from './fluent-select-function.type';

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
    value$: IObservable<IFluentSelectValue> | IFluentSelectValue,
    entries: readonly IFluentObservableSelectEntry[],
  ): IObservable<string>;
}


