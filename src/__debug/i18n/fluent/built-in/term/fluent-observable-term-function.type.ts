import { IObservable } from '@lirx/core';
import { IFluentCallFunctionFunction } from '../call-function/create-fluent-call-function-function';
import { IFluentObservableConcatFunction } from '../concat/create-fluent-observable-concat-function';
import { IFluentGetVariableFunction } from '../get-variable/fluent-get-variable-function.type';
import { IFluentObservableSelectFunction } from '../select/fluent-observable-select-function.type';

export interface IFluentObservableTermOptions {
  concat: IFluentObservableConcatFunction;
  select: IFluentObservableSelectFunction;
  getVariable: IFluentGetVariableFunction;
  callFunction: IFluentCallFunctionFunction;
}

export interface IFluentObservableTermFunction {
  (
    options: IFluentObservableTermOptions,
  ): IObservable<string>;
}
