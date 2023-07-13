import { IFluentCallFunctionEntry } from '../../create-fluent-call-function-function';
import { IFluentListFormatFunction } from './fluent-list-format-function.type';
import { FLUENT_LIST_FUNCTION_NAME } from './fluent-list-function-name.constant';

export function createFluentListFormatFunctionEntry(
  fluentListFormat: IFluentListFormatFunction,
): IFluentCallFunctionEntry {
  return [
    FLUENT_LIST_FUNCTION_NAME,
    fluentListFormat,
  ];
}
