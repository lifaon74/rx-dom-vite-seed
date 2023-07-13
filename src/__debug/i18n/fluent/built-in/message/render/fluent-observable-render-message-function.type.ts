import { IObservable } from '@lirx/core';
import { IFluentObservableMessageOptions } from '../fluent-observable-message-function.type';

export interface IFluentObservableRenderMessageFunction {
  (
    key: string,
    options: IFluentObservableMessageOptions,
  ): IObservable<string>;
}
