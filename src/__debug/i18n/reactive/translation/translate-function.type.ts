import { IObservable } from '@lirx/core';

export type ITranslateFunctionVariables =
  | ITranslateFunctionVariablesAsObservable
  | ITranslateFunctionVariablesAsObject
  ;

export type ITranslateFunctionVariablesAsObservable = IObservable<ITranslateFunctionVariablesAsObservableValue>;

export type ITranslateFunctionVariablesAsObservableValue =
  Iterable<readonly [key: string, value: unknown]>
  ;

export type ITranslateFunctionVariablesAsObject = Record<string, IObservable<unknown>>;


export interface ITranslateFunction {
  (
    key: string,
    variables$?: ITranslateFunctionVariables,
  ): IObservable<string>;
}
