import { IInputValidator } from '../input-validator/input-validator.type';
import { IInputValidatorResult } from '../input-validator/input-validator-result.type';

export function aggregateInputValidators(
  inputValidators: readonly IInputValidator[],
): IInputValidator {
  return (
    value: string,
  ): IInputValidatorResult => {
    for (let i = 0, l = inputValidators.length; i < l; i++) {
      const result: IInputValidatorResult = inputValidators[i](value);
      if (result.length > 0) {
        return result;
      }
    }
    return [];
  };
}


export function aggregateParallelInputValidators(
  inputValidators: readonly IInputValidator[],
): IInputValidator {
  return (
    value: string,
  ): IInputValidatorResult => {
    const aggregatedResult: string[] = [];
    for (let i = 0, l = inputValidators.length; i < l; i++) {
      aggregatedResult.push(...inputValidators[i](value));
    }
    return aggregatedResult as unknown as IInputValidatorResult;
  };
}

