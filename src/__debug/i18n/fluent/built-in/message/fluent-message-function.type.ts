import { IFluentCallFunctionFunction } from '../call-function/create-fluent-call-function-function';
import { IFluentConcatFunction } from '../concat/create-fluent-concat-function';
import { IFluentGetVariableFunction } from '../get-variable/fluent-get-variable-function.type';
import { IFluentSelectFunction } from '../select/fluent-select-function.type';

export interface IFluentMessageOptions {
  concat: IFluentConcatFunction;
  select: IFluentSelectFunction;
  getVariable: IFluentGetVariableFunction;
  callFunction: IFluentCallFunctionFunction;
}

export interface IFluentMessageFunction {
  (
    options: IFluentMessageOptions,
  ): string;
}
