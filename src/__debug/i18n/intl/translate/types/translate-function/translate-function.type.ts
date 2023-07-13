import { ITranslateFunctions } from './translate-functions.type';
import { ITranslateVariables } from './translate-variables.type';

export interface ITranslateFunction {
  (
    variables: ITranslateVariables,
    functions: ITranslateFunctions,
  ): string;
}
