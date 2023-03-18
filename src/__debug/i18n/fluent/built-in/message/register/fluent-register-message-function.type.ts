import { IFluentMessageFunction } from '../fluent-message-function.type';

export interface IFluentRegisterMessageFunction {
  (
    key: string,
    fnc: IFluentMessageFunction,
  ): void;
}
