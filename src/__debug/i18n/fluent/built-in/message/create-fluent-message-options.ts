import {
  createFluentDefaultCallFunctionEntries,
  ICreateFluentDefaultCallFunctionEntries,
} from '../call-function/built-in/create-fluent-default-call-function-entries';
import {
  createFluentCallFunctionFunction,
  IFluentCallFunctionEntry,
  IFluentCallFunctionFunction,
} from '../call-function/create-fluent-call-function-function';
import { createFluentConcatFunction, IFluentConcatFunction } from '../concat/create-fluent-concat-function';
import { createFluentGetVariableFunction } from '../get-variable/create-fluent-get-variable-function';
import { IFluentGetVariableEntry, IFluentGetVariableFunction } from '../get-variable/fluent-get-variable-function.type';
import { createFluentSelectFunction } from '../select/create-fluent-select-function';
import { IFluentSelectFunction } from '../select/fluent-select-function.type';
import { IFluentMessageOptions } from './fluent-message-function.type';

export interface ICreateFluentMessageOptionsOptions extends ICreateFluentDefaultCallFunctionEntries {
  variables?: Iterable<IFluentGetVariableEntry>;
  functions?: Iterable<IFluentCallFunctionEntry>;
}

export function createFluentMessageOptions(
  {
    fluentNumberFormat,
    fluentDateTimeFormat,
    fluentListFormat,
    fluentPluralRulesSelect,
    variables = [],
    functions = [],
  }: ICreateFluentMessageOptionsOptions,
): IFluentMessageOptions {
  const concat: IFluentConcatFunction = createFluentConcatFunction({
    fluentNumberFormat,
    fluentDateTimeFormat,
  });

  const select: IFluentSelectFunction = createFluentSelectFunction({
    fluentPluralRulesSelect,
  });

  const getVariable: IFluentGetVariableFunction = createFluentGetVariableFunction(variables);

  const callFunction: IFluentCallFunctionFunction = createFluentCallFunctionFunction([
    ...createFluentDefaultCallFunctionEntries({
      fluentNumberFormat,
      fluentDateTimeFormat,
      fluentListFormat,
      fluentPluralRulesSelect,
    }),
    ...functions,
  ]);

  return {
    concat,
    select,
    getVariable,
    callFunction,
  };
}
