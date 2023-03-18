import { IFluentMessageOptions } from '../fluent-message-function.type';

export interface IFluentRenderMessageFunction {
  (
    key: string,
    options: IFluentMessageOptions,
  ): string;
}
