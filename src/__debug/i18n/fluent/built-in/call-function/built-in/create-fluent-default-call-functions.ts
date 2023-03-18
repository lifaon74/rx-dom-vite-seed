import { ILocalesInput } from '../../../../intl/locale/locales-input.type';
import { ICreateFluentDefaultCallFunctionEntries } from './create-fluent-default-call-function-entries';
import { createFluentDateTimeFormatFunction } from './date-time/create-fluent-date-time-format-function';
import { createFluentListFormatFunction } from './list/create-fluent-list-format-function';
import { createFluentNumberFormatFunction } from './number/create-fluent-number-format-function';
import { createFluentPluralRulesSelectFunction } from './plural-rules/create-fluent-plural-rules-select-function';

export interface IFluentDefaultCallFunctionsOptions {
  locales?: ILocalesInput;
  numberFormatOptions?: Intl.NumberFormatOptions;
  dateTimeFormatOptions?: Intl.DateTimeFormatOptions;
  pluralRulesOptions?: Intl.PluralRulesOptions;
  listFormatOptions?: Intl.ListFormatOptions;
}

export function createFluentDefaultCallFunctions(
  {
    locales,
    numberFormatOptions,
    dateTimeFormatOptions,
    pluralRulesOptions,
    listFormatOptions,
  }: IFluentDefaultCallFunctionsOptions = {},
): ICreateFluentDefaultCallFunctionEntries {
  return {
    fluentNumberFormat: createFluentNumberFormatFunction(locales, numberFormatOptions),
    fluentDateTimeFormat: createFluentDateTimeFormatFunction(locales, dateTimeFormatOptions),
    fluentPluralRulesSelect: createFluentPluralRulesSelectFunction(locales, pluralRulesOptions),
    fluentListFormat: createFluentListFormatFunction(locales, listFormatOptions),
  };
}
