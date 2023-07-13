import { IObservable } from '@lirx/core';
import { IPartialObservableTranslateFunctionFunctions } from './observable-translate-function-functions.type';
import {
  IObservableTranslateFunctionVariables,
  IObservableTranslateFunctionVariablesLike,
} from './observable-translate-function-variables.type';

export interface IObservableTranslateFunction {
  (
    key: string,
    variables?: IObservableTranslateFunctionVariables,
    functions?: IPartialObservableTranslateFunctionFunctions,
  ): IObservable<string>;
}

export interface IObservableTranslateFunctionLike {
  (
    key: string,
    variables?: IObservableTranslateFunctionVariablesLike,
    functions?: IPartialObservableTranslateFunctionFunctions,
  ): IObservable<string>;
}
