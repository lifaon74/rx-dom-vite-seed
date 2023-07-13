import { IFluentObservableTermFunction } from '../fluent-observable-term-function.type';

export interface IFluentObservableRegisterTermFunction {
  (
    key: string,
    fnc: IFluentObservableTermFunction,
  ): void;
}
