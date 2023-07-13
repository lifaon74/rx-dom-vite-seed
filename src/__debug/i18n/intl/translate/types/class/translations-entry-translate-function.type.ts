import { ITranslateFunctionFunctions } from '../translate-function-functions.type';
import { ITranslateFunctionVariables } from '../translate-function-variables.type';

export interface ITranslationsEntryTranslateFunction {
  (
    variables: ITranslateFunctionVariables,
    functions: ITranslateFunctionFunctions,
  ): string;
}
