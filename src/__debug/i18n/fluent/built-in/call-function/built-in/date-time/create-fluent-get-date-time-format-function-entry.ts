import { IFluentCallFunctionEntry } from '../../create-fluent-call-function-function';
import { IFluentDateTimeFormatFunction } from './fluent-date-time-format-function.type';

export function createFluentGetDateTimeFormatFunctionEntry(
  fluentDateTimeFormat: IFluentDateTimeFormatFunction,
): IFluentCallFunctionEntry {
  return [
    'DATETIME',
    fluentDateTimeFormat,
  ];
}
