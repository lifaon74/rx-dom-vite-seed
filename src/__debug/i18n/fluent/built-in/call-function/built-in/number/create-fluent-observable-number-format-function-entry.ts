import { IFluentCallFunctionEntry } from '../../create-fluent-call-function-function';
import { IFluentNumberFormatFunction } from './fluent-number-format-function.type';
import { FLUENT_NUMBER_FUNCTION_NAME } from './fluent-number-function-name.constant';
import { IFluentObservableNumberFormatFunction } from './fluent-observable-number-format-function.type';

export function createFluentObservableNumberFormatFunctionEntry(
  fluentNumberFormat: IFluentObservableNumberFormatFunction,
): IFluentCallFunctionEntry {
  return [
    FLUENT_NUMBER_FUNCTION_NAME,
    fluentNumberFormat,
  ];
}
