import { IFluentCallFunctionEntry } from '../create-fluent-call-function-function';
import { createFluentGetDateTimeFormatFunctionEntry } from './date-time/create-fluent-get-date-time-format-function-entry';
import { IFluentDateTimeFormatFunction } from './date-time/fluent-date-time-format-function.type';
import { createFluentListFormatFunctionEntry } from './list/create-fluent-list-format-function-entry';
import { IFluentListFormatFunction } from './list/fluent-list-format-function.type';
import { createFluentNumberFormatFunctionEntry } from './number/create-fluent-number-format-function-entry';
import { IFluentNumberFormatFunction } from './number/fluent-number-format-function.type';
import { createFluentPluralRulesSelectFunctionEntry } from './plural-rules/create-fluent-plural-rules-select-function-entry';
import { IFluentPluralRulesSelectFunction } from './plural-rules/fluent-plural-rules-select-function.type';

export interface ICreateFluentDefaultCallFunctionEntries {
  fluentNumberFormat: IFluentNumberFormatFunction;
  fluentDateTimeFormat: IFluentDateTimeFormatFunction;
  fluentPluralRulesSelect: IFluentPluralRulesSelectFunction;
  fluentListFormat: IFluentListFormatFunction;
}

export function createFluentDefaultCallFunctionEntries(
  {
    fluentNumberFormat,
    fluentDateTimeFormat,
    fluentPluralRulesSelect,
    fluentListFormat,
  }: ICreateFluentDefaultCallFunctionEntries,
): IFluentCallFunctionEntry[] {
  return [
    createFluentNumberFormatFunctionEntry(fluentNumberFormat),
    createFluentGetDateTimeFormatFunctionEntry(fluentDateTimeFormat),
    createFluentPluralRulesSelectFunctionEntry(fluentPluralRulesSelect),
    createFluentListFormatFunctionEntry(fluentListFormat),
  ];
}
