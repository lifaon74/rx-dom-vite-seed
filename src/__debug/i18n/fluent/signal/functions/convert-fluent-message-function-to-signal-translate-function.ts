import { computed, ISignal } from '@lirx/core';
import { EQUAL_FUNCTION_STRICT_EQUAL } from '@lirx/utils';
import { ISignalTranslateFunction } from '../../../intl/translate/signal/types/translate-function/signal-translate-function.type';
import { ISignalTranslateFunctions } from '../../../intl/translate/signal/types/translate-function/signal-translate-functions.type';
import { ISignalTranslateVariables } from '../../../intl/translate/signal/types/translate-function/signal-translate-variables.type';
import { IGenericTranslateFunctionFunctions, ITranslateFunctionFunctions } from '../../../intl/translate/types/translate-function-functions.type';
import { createFluentDefaultCallFunctionEntries } from '../../built-in/call-function/built-in/create-fluent-default-call-function-entries';
import { IFluentDateTimeFormatFunction } from '../../built-in/call-function/built-in/date-time/fluent-date-time-format-function.type';
import {
  convertListFormatFunctionToFluentListFormat,
} from '../../built-in/call-function/built-in/list/convert-list-format-function-to-fluent-list-format';
import { IFluentListFormatFunction } from '../../built-in/call-function/built-in/list/fluent-list-format-function.type';
import { IFluentNumberFormatFunction } from '../../built-in/call-function/built-in/number/fluent-number-format-function.type';
import { IFluentPluralRulesSelectFunction } from '../../built-in/call-function/built-in/plural-rules/fluent-plural-rules-select-function.type';
import {
  createFluentCallFunctionFunction,
  IFluentCallFunctionEntry,
  IFluentCallFunctionFunction,
} from '../../built-in/call-function/create-fluent-call-function-function';
import { createFluentConcatFunction, IFluentConcatFunction } from '../../built-in/concat/create-fluent-concat-function';
import { createFluentGetVariableFunction } from '../../built-in/get-variable/create-fluent-get-variable-function';
import { IFluentGetVariableFunction } from '../../built-in/get-variable/fluent-get-variable-function.type';
import { IFluentMessageFunction } from '../../built-in/message/fluent-message-function.type';
import { createFluentSelectFunction } from '../../built-in/select/create-fluent-select-function';
import { IFluentSelectFunction } from '../../built-in/select/fluent-select-function.type';

const EMPTY_OBJECT = {};

export function convertFluentMessageFunctionToSignalTranslateFunction(
  fluentMessageFunction: IFluentMessageFunction,
): ISignalTranslateFunction {
  return (
    variables: ISignalTranslateVariables,
    functions: ISignalTranslateFunctions,
  ): ISignal<string> => {

    const fluentNumberFormat = computed((): IFluentNumberFormatFunction => {
      return functions().numberFormat;
    });

    const fluentDateTimeFormat = computed((): IFluentDateTimeFormatFunction => {
      return functions().dateTimeFormat;
    });

    const fluentListFormat = computed((): IFluentListFormatFunction => {
      return convertListFormatFunctionToFluentListFormat(functions().listFormat);
    });

    const fluentPluralRulesSelect = computed((): IFluentPluralRulesSelectFunction => {
      return functions().pluralRulesSelect;
    });

    const otherFunctions = computed((): IGenericTranslateFunctionFunctions => {
      const {
        numberFormat,
        dateTimeFormat,
        listFormat,
        pluralRulesSelect,
        ...otherFunctions
      }: ITranslateFunctionFunctions = functions();
      return (Object.keys(otherFunctions).length === 0)
        ? EMPTY_OBJECT
        : otherFunctions;
    });

    const fluentDefaultCallFunctionEntries = computed((): IFluentCallFunctionEntry[] => {
      return createFluentDefaultCallFunctionEntries({
        fluentNumberFormat: fluentNumberFormat(),
        fluentDateTimeFormat: fluentDateTimeFormat(),
        fluentListFormat: fluentListFormat(),
        fluentPluralRulesSelect: fluentPluralRulesSelect(),
      });
    });

    const fluentOtherCallFunctionEntries = computed((): IFluentCallFunctionEntry[] => {
      return Object.entries(otherFunctions());
    });

    /*--*/

    const getVariable = computed((): IFluentGetVariableFunction => {
      return createFluentGetVariableFunction(Object.entries(variables()));
    });

    const concat = computed((): IFluentConcatFunction => {
      return createFluentConcatFunction({
        fluentNumberFormat: fluentNumberFormat(),
        fluentDateTimeFormat: fluentDateTimeFormat(),
      });
    });

    const select = computed((): IFluentSelectFunction => {
      return createFluentSelectFunction({
        fluentPluralRulesSelect: fluentPluralRulesSelect(),
      });
    });

    const callFunction = computed((): IFluentCallFunctionFunction => {
      return createFluentCallFunctionFunction([
        ...fluentDefaultCallFunctionEntries(),
        ...fluentOtherCallFunctionEntries(),
      ]);
    });

    return computed((): string => {
      return fluentMessageFunction({
        getVariable: getVariable(),
        concat: concat(),
        select: select(),
        callFunction: callFunction(),
      });
    });
  };
}
