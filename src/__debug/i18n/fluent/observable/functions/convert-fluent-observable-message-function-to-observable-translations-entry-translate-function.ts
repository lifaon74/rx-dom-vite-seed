import { IObservable } from '@lirx/core';
import {
  IObservableTranslationsEntryTranslateFunction,
} from '../../../intl/translate/observable/types/class/observable-translations-entry-translate-function.type';
import {
  IObservableTranslateFunctionFunctions,
} from '../../../intl/translate/observable/types/observable-translate-function-functions.type';
import {
  IObservableTranslateFunctionVariables,
} from '../../../intl/translate/observable/types/observable-translate-function-variables.type';
import {
  createFluentDefaultObservableCallFunctionEntries,
} from '../../built-in/call-function/built-in/observable/create-fluent-default-observable-call-function-entries';
import {
  convertObservableDateTimeFormatFunctionToFluentObservableDateTimeFormat,
} from '../../built-in/call-function/built-in/observable/date-time/convert-observable-date-time-format-function-to-fluent-observable-date-time-format';
import {
  IFluentObservableDateTimeFormatFunction,
} from '../../built-in/call-function/built-in/observable/date-time/fluent-observable-date-time-format-function.type';
import {
  convertObservableListFormatFunctionToFluentObservableListFormat,
} from '../../built-in/call-function/built-in/observable/list/convert-observable-list-format-function-to-fluent-observable-list-format';
import {
  IFluentObservableListFormatFunction,
} from '../../built-in/call-function/built-in/observable/list/fluent-observable-list-format-function.type';
import {
  convertObservableNumberFormatFunctionToFluentObservableNumberFormat,
} from '../../built-in/call-function/built-in/observable/number/convert-observable-number-format-function-to-fluent-observable-number-format';
import {
  IFluentObservableNumberFormatFunction,
} from '../../built-in/call-function/built-in/observable/number/fluent-observable-number-format-function.type';
import {
  convertObservablePluralRulesSelectFunctionToFluentObservablePluralRulesSelect,
} from '../../built-in/call-function/built-in/observable/plural-rules/convert-observable-plural-rules-select-function-to-fluent-observable-plural-rules-select';
import {
  IFluentObservablePluralRulesSelectFunction,
} from '../../built-in/call-function/built-in/observable/plural-rules/fluent-observable-plural-rules-select-function.type';
import {
  createFluentCallFunctionFunction,
  IFluentCallFunctionFunction,
} from '../../built-in/call-function/create-fluent-call-function-function';
import { createFluentObservableConcatFunction } from '../../built-in/concat/observable/create-fluent-observable-concat-function';
import { IFluentObservableConcatFunction } from '../../built-in/concat/observable/fluent-observable-concat-function.type';
import { createFluentGetVariableFunction } from '../../built-in/get-variable/create-fluent-get-variable-function';
import { IFluentObservableMessageFunction } from '../../built-in/message/observable/fluent-observable-message-function.type';
import { createFluentObservableSelectFunction } from '../../built-in/select/observable/create-fluent-observable-select-function';
import { IFluentObservableSelectFunction } from '../../built-in/select/observable/fluent-observable-select-function.type';

export function convertFluentObservableMessageFunctionToObservableTranslationsEntryTranslateFunction(
  fluentMessageFunction: IFluentObservableMessageFunction,
): IObservableTranslationsEntryTranslateFunction {
  return (
    variables: IObservableTranslateFunctionVariables,
    functions: IObservableTranslateFunctionFunctions,
  ): IObservable<string> => {

    const {
      numberFormat,
      dateTimeFormat,
      listFormat,
      pluralRulesSelect,
      ...otherFunctions
    }: IObservableTranslateFunctionFunctions = functions;

    const fluentNumberFormat: IFluentObservableNumberFormatFunction = convertObservableNumberFormatFunctionToFluentObservableNumberFormat(numberFormat);
    const fluentDateTimeFormat: IFluentObservableDateTimeFormatFunction = convertObservableDateTimeFormatFunctionToFluentObservableDateTimeFormat(dateTimeFormat);
    const fluentListFormat: IFluentObservableListFormatFunction = convertObservableListFormatFunctionToFluentObservableListFormat(listFormat);
    const fluentPluralRulesSelect: IFluentObservablePluralRulesSelectFunction = convertObservablePluralRulesSelectFunctionToFluentObservablePluralRulesSelect(pluralRulesSelect);

    const concat: IFluentObservableConcatFunction = createFluentObservableConcatFunction({
      fluentNumberFormat,
      fluentDateTimeFormat,
    });

    const select: IFluentObservableSelectFunction = createFluentObservableSelectFunction({
      fluentPluralRulesSelect,
    });

    const getVariable = createFluentGetVariableFunction(
      Object.entries(variables),
    );

    const callFunction: IFluentCallFunctionFunction = createFluentCallFunctionFunction([
      ...createFluentDefaultObservableCallFunctionEntries({
        fluentNumberFormat,
        fluentDateTimeFormat,
        fluentListFormat,
        fluentPluralRulesSelect,
      }),
      ...Object.entries(otherFunctions),
    ]);

    return fluentMessageFunction({
      getVariable,
      concat,
      select,
      callFunction,
    });
  };
}
