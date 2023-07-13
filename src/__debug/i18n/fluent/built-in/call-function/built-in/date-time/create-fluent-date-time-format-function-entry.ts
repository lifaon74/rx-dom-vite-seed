import { IFluentCallFunctionEntry } from '../../create-fluent-call-function-function';
import { IFluentDateTimeFormatFunction } from './fluent-date-time-format-function.type';
import { FLUENT_DATE_TIME_FUNCTION_NAME } from './fluent-date-time-function-name.constant';

export function createFluentDateTimeFormatFunctionEntry(
  fluentDateTimeFormat: IFluentDateTimeFormatFunction,
): IFluentCallFunctionEntry {
  return [
    FLUENT_DATE_TIME_FUNCTION_NAME,
    fluentDateTimeFormat,
  ];
}
