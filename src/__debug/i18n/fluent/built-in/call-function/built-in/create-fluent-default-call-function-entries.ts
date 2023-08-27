import { IFluentCallFunctionEntry } from '../create-fluent-call-function-function';
import { IFluentDateTimeFormatFunction } from './date-time/fluent-date-time-format-function.type';
import { FLUENT_DATE_TIME_FUNCTION_NAME } from './date-time/fluent-date-time-function-name.constant';
import { IFluentListFormatFunction } from './list/fluent-list-format-function.type';
import { FLUENT_LIST_FUNCTION_NAME } from './list/fluent-list-function-name.constant';
import { IFluentNumberFormatFunction } from './number/fluent-number-format-function.type';
import { FLUENT_NUMBER_FUNCTION_NAME } from './number/fluent-number-function-name.constant';
import { FLUENT_PLURAL_RULES_FUNCTION_NAME } from './plural-rules/fluent-plural-rules-function-name.constant';
import { IFluentPluralRulesSelectFunction } from './plural-rules/fluent-plural-rules-select-function.type';

export interface ICreateFluentDefaultCallFunctionEntries {
  fluentNumberFormat: IFluentNumberFormatFunction;
  fluentDateTimeFormat: IFluentDateTimeFormatFunction;
  fluentListFormat: IFluentListFormatFunction;
  fluentPluralRulesSelect: IFluentPluralRulesSelectFunction;
}

export function createFluentDefaultCallFunctionEntries(
  {
    fluentNumberFormat,
    fluentDateTimeFormat,
    fluentListFormat,
    fluentPluralRulesSelect,
  }: ICreateFluentDefaultCallFunctionEntries,
): IFluentCallFunctionEntry[] {
  return [
    [FLUENT_NUMBER_FUNCTION_NAME, fluentNumberFormat],
    [FLUENT_DATE_TIME_FUNCTION_NAME, fluentDateTimeFormat],
    [FLUENT_LIST_FUNCTION_NAME, fluentListFormat],
    [FLUENT_PLURAL_RULES_FUNCTION_NAME, fluentPluralRulesSelect],
  ];
}
