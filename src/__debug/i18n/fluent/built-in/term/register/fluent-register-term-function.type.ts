import { IFluentTermFunction } from '../fluent-term-function.type';

export interface IFluentRegisterTermFunction {
  (
    key: string,
    fnc: IFluentTermFunction,
  ): void;
}
