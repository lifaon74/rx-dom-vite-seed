import { IInputValidatorResult } from './input-validator-result.type';

export interface IInputValidator {
  (
    value: string,
  ): IInputValidatorResult;
}

