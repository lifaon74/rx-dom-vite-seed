import { IInputValidatorErrorResult } from '../input-validator/input-validator-result.type';

export interface IInputValidatorErrorFactoryWithArguments<GArguments extends any[]> {
  (
    value: string,
    ...args: GArguments
  ): IInputValidatorErrorResult;
}
