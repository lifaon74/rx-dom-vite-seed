import { IObservable } from '@lirx/core';
import { IObservableTranslateFunctionFunctions } from '../observable-translate-function-functions.type';
import { IObservableTranslateFunctionVariables } from '../observable-translate-function-variables.type';

export interface IObservableTranslationsEntryTranslateFunction {
  (
    variables$: IObservableTranslateFunctionVariables,
    functions: IObservableTranslateFunctionFunctions,
  ): IObservable<string>;
}
