import { ISignal } from '@lirx/core';
import { ISignalTranslateFunctions } from './signal-translate-functions.type';
import { ISignalTranslateVariables } from './signal-translate-variables.type';

export interface ISignalTranslateFunction {
  (
    variables: ISignalTranslateVariables,
    functions: ISignalTranslateFunctions,
  ): ISignal<string>;
}
