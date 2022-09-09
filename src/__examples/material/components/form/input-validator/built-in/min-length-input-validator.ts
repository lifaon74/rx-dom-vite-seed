import {
  inputValidatorErrorFactoryWithArgumentsToInputValidatorErrorFactory,
} from '../error-message-factory/input-validator-error-factory-with-arguments-to-input-validator-error-factory';
import { IInputValidatorErrorFactoryWithArguments } from '../error-message-factory/input-validator-error-factory-with-arguments.type';
import { IInputValidator } from '../input-validator/input-validator.type';
import { IInputValidatorErrorResult, IInputValidatorResult } from '../input-validator/input-validator-result.type';

export const DEFAULT_MIN_LENGTH_INPUT_VALIDATOR_ERROR_FACTORY = (
  value: string,
  minLength: number,
): IInputValidatorErrorResult => {
  return [
    `Min length of ${minLength} required`,
  ];
};

export function minLengthInputValidator(
  minLength: number,
  errorFactory: IInputValidatorErrorFactoryWithArguments<[number]> = DEFAULT_MIN_LENGTH_INPUT_VALIDATOR_ERROR_FACTORY,
): IInputValidator {
  const _errorFactory = inputValidatorErrorFactoryWithArgumentsToInputValidatorErrorFactory(errorFactory, [minLength]);
  return (
    value: string,
  ): IInputValidatorResult => {
    if (value.length < minLength) {
      return _errorFactory(value);
    } else {
      return [];
    }
  };
}
