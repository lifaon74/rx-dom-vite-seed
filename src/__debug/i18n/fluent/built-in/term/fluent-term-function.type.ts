import { IFluentCallFunctionFunction } from '../call-function/create-fluent-call-function-function';

import { IFluentConcatFunction } from '../concat/fluent-concat-function.type';
import { IFluentGetVariableFunction } from '../get-variable/fluent-get-variable-function.type';
import { IFluentSelectFunction } from '../select/fluent-select-function.type';

export interface IFluentTermOptions {
  concat: IFluentConcatFunction;
  select: IFluentSelectFunction;
  getVariable: IFluentGetVariableFunction;
  callFunction: IFluentCallFunctionFunction;
}

export interface IFluentTermFunction {
  (
    options: IFluentTermOptions,
  ): string;
}
