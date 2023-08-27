import { IObservable, IObservableLike } from '@lirx/core';

import { IFluentConcatFunctionListItem } from '../fluent-concat-function.type';

export type IFluentObservableConcatFunctionListItem = IObservableLike<IFluentConcatFunctionListItem>;

export type IFluentObservableConcatFunctionList = readonly IFluentObservableConcatFunctionListItem[];

export interface IFluentObservableConcatFunction {
  (
    parts: IFluentObservableConcatFunctionList,
  ): IObservable<string>;
}
