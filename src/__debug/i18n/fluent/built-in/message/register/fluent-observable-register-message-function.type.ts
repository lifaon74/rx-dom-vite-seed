import { IFluentObservableMessageFunction } from '../fluent-observable-message-function.type';

export interface IFluentObservableRegisterMessageFunction {
  (
    key: string,
    fnc: IFluentObservableMessageFunction,
  ): void;
}
