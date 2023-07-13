import { IPartialTranslateFunctionFunctions } from './translate-function-functions.type';
import { ITranslateFunctionVariables } from './translate-function-variables.type';

export interface ITranslateFunction {
  (
    key: string,
    variables?: ITranslateFunctionVariables,
    functions?: IPartialTranslateFunctionFunctions,
  ): string;
}
