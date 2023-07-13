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
} from '../../built-in/call-function/built-in/create-fluent-default-observable-call-function-entries';
import {
  IFluentObservableDateTimeFormatFunction,
} from '../../built-in/call-function/built-in/date-time/fluent-observable-date-time-format-function.type';
import {
  IFluentObservableListFormatFunction,
} from '../../built-in/call-function/built-in/list/fluent-observable-list-format-function.type';
import {
  IFluentObservableNumberFormatFunction,
} from '../../built-in/call-function/built-in/number/fluent-observable-number-format-function.type';
import {
  IFluentObservablePluralRulesSelectFunction,
} from '../../built-in/call-function/built-in/plural-rules/fluent-observable-plural-rules-select-function.type';
import {
  createFluentCallFunctionFunction,
  IFluentCallFunctionFunction,
} from '../../built-in/call-function/create-fluent-call-function-function';
import {
  createFluentObservableConcatFunction,
  IFluentObservableConcatFunction,
} from '../../built-in/concat/create-fluent-observable-concat-function';
import { createFluentGetVariableFunction } from '../../built-in/get-variable/create-fluent-get-variable-function';
import { IFluentObservableMessageFunction } from '../../built-in/message/fluent-observable-message-function.type';
import { createFluentObservableSelectFunction } from '../../built-in/select/create-fluent-observable-select-function';
import { IFluentObservableSelectFunction } from '../../built-in/select/fluent-observable-select-function.type';

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

    const fluentNumberFormat: IFluentObservableNumberFormatFunction = numberFormat;
    const fluentDateTimeFormat: IFluentObservableDateTimeFormatFunction = dateTimeFormat;
    const fluentListFormat: IFluentObservableListFormatFunction = listFormat as any; // TODO
    const fluentPluralRulesSelect: IFluentObservablePluralRulesSelectFunction = pluralRulesSelect;

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
