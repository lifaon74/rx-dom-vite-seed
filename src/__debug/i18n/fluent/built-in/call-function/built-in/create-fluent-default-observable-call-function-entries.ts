import { IFluentCallFunctionEntry } from '../create-fluent-call-function-function';
import { createFluentDateTimeFormatFunctionEntry } from './date-time/create-fluent-date-time-format-function-entry';
import { createFluentObservableDateTimeFormatFunctionEntry } from './date-time/create-fluent-observable-date-time-format-function-entry';
import { IFluentDateTimeFormatFunction } from './date-time/fluent-date-time-format-function.type';
import { IFluentObservableDateTimeFormatFunction } from './date-time/fluent-observable-date-time-format-function.type';
import { createFluentListFormatFunctionEntry } from './list/create-fluent-list-format-function-entry';
import { createFluentObservableListFormatFunctionEntry } from './list/create-fluent-observable-list-format-function-entry';
import { IFluentListFormatFunction } from './list/fluent-list-format-function.type';
import { IFluentObservableListFormatFunction } from './list/fluent-observable-list-format-function.type';
import { createFluentNumberFormatFunctionEntry } from './number/create-fluent-number-format-function-entry';
import { createFluentObservableNumberFormatFunctionEntry } from './number/create-fluent-observable-number-format-function-entry';
import { IFluentNumberFormatFunction } from './number/fluent-number-format-function.type';
import { IFluentObservableNumberFormatFunction } from './number/fluent-observable-number-format-function.type';
import {
  createFluentObservablePluralRulesSelectFunctionEntry,
} from './plural-rules/create-fluent-observable-plural-rules-select-function-entry';
import { createFluentPluralRulesSelectFunctionEntry } from './plural-rules/create-fluent-plural-rules-select-function-entry';
import { IFluentObservablePluralRulesSelectFunction } from './plural-rules/fluent-observable-plural-rules-select-function.type';
import { IFluentPluralRulesSelectFunction } from './plural-rules/fluent-plural-rules-select-function.type';

export interface ICreateFluentDefaultObservableCallFunctionEntries {
  fluentNumberFormat: IFluentObservableNumberFormatFunction;
  fluentDateTimeFormat: IFluentObservableDateTimeFormatFunction;
  fluentListFormat: IFluentObservableListFormatFunction;
  fluentPluralRulesSelect: IFluentObservablePluralRulesSelectFunction;
}

export function createFluentDefaultObservableCallFunctionEntries(
  {
    fluentNumberFormat,
    fluentDateTimeFormat,
    fluentListFormat,
    fluentPluralRulesSelect,
  }: ICreateFluentDefaultObservableCallFunctionEntries,
): IFluentCallFunctionEntry[] {
  return [
    createFluentObservableNumberFormatFunctionEntry(fluentNumberFormat),
    createFluentObservableDateTimeFormatFunctionEntry(fluentDateTimeFormat),
    createFluentObservableListFormatFunctionEntry(fluentListFormat),
    createFluentObservablePluralRulesSelectFunctionEntry(fluentPluralRulesSelect),
  ];
}
