import { IObservable } from '@lirx/core';
import { IFluentObservableTermOptions } from '../fluent-observable-term-function.type';
import { IFluentRenderTermFunctionEntry } from '../../render/fluent-render-term-function.type';

export interface IFluentObservableRenderTermFunction {
  (
    key: string,
    options: IFluentObservableTermOptions,
    entries: readonly IFluentRenderTermFunctionEntry[],
  ): IObservable<string>;
}
