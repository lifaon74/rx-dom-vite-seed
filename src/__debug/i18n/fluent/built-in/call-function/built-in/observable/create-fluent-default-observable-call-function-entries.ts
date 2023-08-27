import { IFluentCallFunctionEntry } from '../../create-fluent-call-function-function';
import { FLUENT_DATE_TIME_FUNCTION_NAME } from '../date-time/fluent-date-time-function-name.constant';
import { IFluentObservableDateTimeFormatFunction } from './date-time/fluent-observable-date-time-format-function.type';
import { FLUENT_LIST_FUNCTION_NAME } from '../list/fluent-list-function-name.constant';
import { IFluentObservableListFormatFunction } from './list/fluent-observable-list-format-function.type';
import { FLUENT_NUMBER_FUNCTION_NAME } from '../number/fluent-number-function-name.constant';
import { IFluentObservableNumberFormatFunction } from './number/fluent-observable-number-format-function.type';
import { IFluentObservablePluralRulesSelectFunction } from './plural-rules/fluent-observable-plural-rules-select-function.type';
import { FLUENT_PLURAL_RULES_FUNCTION_NAME } from '../plural-rules/fluent-plural-rules-function-name.constant';

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
    [FLUENT_NUMBER_FUNCTION_NAME, fluentNumberFormat],
    [FLUENT_DATE_TIME_FUNCTION_NAME, fluentDateTimeFormat],
    [FLUENT_LIST_FUNCTION_NAME, fluentListFormat],
    [FLUENT_PLURAL_RULES_FUNCTION_NAME, fluentPluralRulesSelect],
  ];
}
