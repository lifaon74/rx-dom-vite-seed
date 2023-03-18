import { IFluentTermOptions } from '../fluent-term-function.type';

export type IFluentRenderTermFunctionEntry = readonly [
  key: string,
  value: unknown,
];

export interface IFluentRenderTermFunction {
  (
    key: string,
    options: IFluentTermOptions,
    entries: readonly IFluentRenderTermFunctionEntry[],
  ): string;
}
