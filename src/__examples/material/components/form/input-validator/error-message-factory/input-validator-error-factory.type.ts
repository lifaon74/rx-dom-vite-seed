import { IInputValidatorErrorResult } from '../input-validator/input-validator-result.type';

export interface IInputValidatorErrorFactory<GArguments extends any[]> {
  (
    value: string,
  ): IInputValidatorErrorResult;
}
