import { IFluentCallFunctionEntry } from '../../create-fluent-call-function-function';
import { IFluentNumberFormatFunction } from './fluent-number-format-function.type';
import { FLUENT_NUMBER_FUNCTION_NAME } from './fluent-number-function-name.constant';

export function createFluentNumberFormatFunctionEntry(
  fluentNumberFormat: IFluentNumberFormatFunction,
): IFluentCallFunctionEntry {
  return [
    FLUENT_NUMBER_FUNCTION_NAME,
    fluentNumberFormat,
  ];
}
