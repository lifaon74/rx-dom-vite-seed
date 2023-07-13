import { IFluentCallFunctionEntry } from '../../create-fluent-call-function-function';
import { FLUENT_DATE_TIME_FUNCTION_NAME } from './fluent-date-time-function-name.constant';
import { IFluentObservableDateTimeFormatFunction } from './fluent-observable-date-time-format-function.type';

export function createFluentObservableDateTimeFormatFunctionEntry(
  fluentDateTimeFormat: IFluentObservableDateTimeFormatFunction,
): IFluentCallFunctionEntry {
  return [
    FLUENT_DATE_TIME_FUNCTION_NAME,
    fluentDateTimeFormat,
  ];
}
