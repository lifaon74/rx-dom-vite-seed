import { IFluentCallFunctionEntry } from '../../create-fluent-call-function-function';
import { IFluentNumberFormatFunction } from './fluent-number-format-function.type';

export function createFluentNumberFormatFunctionEntry(
  fluentNumberFormat: IFluentNumberFormatFunction,
): IFluentCallFunctionEntry {
  return [
    'NUMBER',
    fluentNumberFormat,
  ];
}
