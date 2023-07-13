import { IFluentCallFunctionEntry } from '../../create-fluent-call-function-function';
import { FLUENT_LIST_FUNCTION_NAME } from './fluent-list-function-name.constant';
import { IFluentObservableListFormatFunction } from './fluent-observable-list-format-function.type';

export function createFluentObservableListFormatFunctionEntry(
  fluentListFormat: IFluentObservableListFormatFunction,
): IFluentCallFunctionEntry {
  return [
    FLUENT_LIST_FUNCTION_NAME,
    fluentListFormat,
  ];
}
