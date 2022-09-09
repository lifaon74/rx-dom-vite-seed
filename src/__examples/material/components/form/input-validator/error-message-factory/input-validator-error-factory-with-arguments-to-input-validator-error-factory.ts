import { IInputValidatorErrorResult, IInputValidatorResult } from '../input-validator/input-validator-result.type';
import { IInputValidatorErrorFactory } from './input-validator-error-factory.type';
import { IInputValidatorErrorFactoryWithArguments } from './input-validator-error-factory-with-arguments.type';

export function inputValidatorErrorFactoryWithArgumentsToInputValidatorErrorFactory<GArguments extends any[]>(
  errorMessageFactory: IInputValidatorErrorFactoryWithArguments<GArguments>,
  args: GArguments,
): IInputValidatorErrorFactory<GArguments> {
  return (
    value: string,
  ): IInputValidatorErrorResult => {
    return errorMessageFactory(value, ...args);
  };
}
