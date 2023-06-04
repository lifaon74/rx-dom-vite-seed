import { IConstraint, IConstraintTestFunctionResult } from '../../constraint/constraint.type';
import { createConstraint } from '../../constraint/create-constraint';

export interface IMaxLengthConstraintProperties {
  readonly maxLength: number;
}

export function maxLengthConstraint(
  maxLength: number,
): IConstraint<string, IMaxLengthConstraintProperties> {
  return createConstraint<string, IMaxLengthConstraintProperties>(
    (value: string): IConstraintTestFunctionResult<IMaxLengthConstraintProperties> => {
      return (value.length > maxLength)
        ? ['maxLength']
        : [];
    },
    {
      maxLength,
    },
  );
}
