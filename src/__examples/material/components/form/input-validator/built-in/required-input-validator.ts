import {
  inputValidatorErrorFactoryWithArgumentsToInputValidatorErrorFactory,
} from '../error-message-factory/input-validator-error-factory-with-arguments-to-input-validator-error-factory';
import { IInputValidatorErrorFactoryWithArguments } from '../error-message-factory/input-validator-error-factory-with-arguments.type';
import { IInputValidatorErrorResult, IInputValidatorResult } from '../input-validator/input-validator-result.type';
import { IInputValidator } from '../input-validator/input-validator.type';

export const DEFAULT_REQUIRED_INPUT_VALIDATOR_ERROR_MESSAGE_FACTORY = (): IInputValidatorErrorResult => {
  return [
    `Required`,
  ];
};

export function requiredInputValidator(
  errorFactory: IInputValidatorErrorFactoryWithArguments<[]> = DEFAULT_REQUIRED_INPUT_VALIDATOR_ERROR_MESSAGE_FACTORY,
): IInputValidator {
  const _errorFactory = inputValidatorErrorFactoryWithArgumentsToInputValidatorErrorFactory(errorFactory, []);
  return (
    value: string,
  ): IInputValidatorResult => {
    if (value === '') {
      return _errorFactory(value);
    } else {
      return [];
    }
  };
}
