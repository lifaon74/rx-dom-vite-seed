import { IFluentCallFunctionEntry } from '../../create-fluent-call-function-function';
import { IFluentListFormatFunction } from './fluent-list-format-function.type';

export function createFluentListFormatFunctionEntry(
  fluentListFormat: IFluentListFormatFunction,
): IFluentCallFunctionEntry {
  return [
    'LIST',
    fluentListFormat,
  ];
}
