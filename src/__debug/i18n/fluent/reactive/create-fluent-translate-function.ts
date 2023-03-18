import { function$$, IObservable, map$$ } from '@lirx/core';
import { ILocalesList } from '../../intl/locale/locales-list.type';
import {
  normalizeTranslateFunctionVariablesAsObservable
} from '../../reactive/translation/normalize-translate-function-variables-as-observable';
import {
  ITranslateFunction,
  ITranslateFunctionVariables,
  ITranslateFunctionVariablesAsObservableValue,
} from '../../reactive/translation/translate-function.type';
import {
  createFluentDefaultCallFunctions,
  IFluentDefaultCallFunctionsOptions,
} from '../built-in/call-function/built-in/create-fluent-default-call-functions';
import { createFluentGetVariableFunction } from '../built-in/get-variable/create-fluent-get-variable-function';
import { createFluentMessageOptions } from '../built-in/message/create-fluent-message-options';
import { IFluentMessageOptions } from '../built-in/message/fluent-message-function.type';
import { IFluentRenderMessageFunction } from '../built-in/message/render/fluent-render-message-function.type';

export interface ICreateFluentTranslateFunctionOptions extends IFluentDefaultCallFunctionsOptions {
  locales$: IObservable<ILocalesList>;
  translations$: IObservable<IFluentRenderMessageFunction>;
}

export function createFluentTranslateFunction(
  {
    locales$,
    translations$,
    ...options
  }: ICreateFluentTranslateFunctionOptions,
): ITranslateFunction {
  const options$ = map$$(locales$, (locales: ILocalesList): IFluentMessageOptions => {
    return createFluentMessageOptions(
      createFluentDefaultCallFunctions({
        ...options,
        locales,
      }),
    );
  });

  return (
    key: string,
    variables$?: ITranslateFunctionVariables,
  ): IObservable<string> => {
    return function$$(
      [
        translations$,
        normalizeTranslateFunctionVariablesAsObservable(variables$),
        options$,
      ],
      (
        translations: IFluentRenderMessageFunction,
        variables: ITranslateFunctionVariablesAsObservableValue,
        options: IFluentMessageOptions,
      ): string => {
        return translations(
          key,
          {
            ...options,
            getVariable: createFluentGetVariableFunction(variables),
          },
        );
      },
    );
  };
}
