import {
  inputValidatorErrorFactoryWithArgumentsToInputValidatorErrorFactory,
} from '../error-message-factory/input-validator-error-factory-with-arguments-to-input-validator-error-factory';
import { IInputValidatorErrorFactoryWithArguments } from '../error-message-factory/input-validator-error-factory-with-arguments.type';
import { IInputValidatorErrorResult, IInputValidatorResult } from '../input-validator/input-validator-result.type';
import { IInputValidator } from '../input-validator/input-validator.type';

export interface INumberInputValidatorOptions {
  min?: number;
  max?: number;
  step?: number;
}

export type INumberInputValidatorErrorMessageFactoryArgument = Required<INumberInputValidatorOptions>;

export const DEFAULT_NUMBER_INPUT_VALIDATOR_ERROR_FACTORY = (
  value: string,
  {
    min,
    max,
    step,
  }: INumberInputValidatorErrorMessageFactoryArgument,
): IInputValidatorErrorResult => {

  const _range: string = (
    Number.isFinite(min)
    || Number.isFinite(max)
  )
    ? ` in range [${String(min)}, ${String(max)}]`
    : '';

  const _step: string = (step === 0)
    ? ''
    : ` with a step of ${step}`;

  return [
    `Not a number${_range}${_step}`,
  ];
};

export function numberInputValidator(
  {
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
    step = 0,
  }: INumberInputValidatorOptions = {},
  errorFactory: IInputValidatorErrorFactoryWithArguments<[INumberInputValidatorErrorMessageFactoryArgument]> = DEFAULT_NUMBER_INPUT_VALIDATOR_ERROR_FACTORY,
): IInputValidator {
  const _errorFactory = inputValidatorErrorFactoryWithArgumentsToInputValidatorErrorFactory(errorFactory, [{
    min,
    max,
    step,
  }]);
  return (
    value: string,
  ): IInputValidatorResult => {
    const _value: number = Number(value);
    const _start: number = (min === Number.NEGATIVE_INFINITY)
      ? 0
      : min;

    if (
      Number.isNaN(_value)
      || (_value < min)
      || (_value > max)
      || (
        (step !== 0)
        && (((_value - _start) % step) !== 0)
      )
    ) {
      return _errorFactory(value);
    } else {
      return [];
    }
  };
}
