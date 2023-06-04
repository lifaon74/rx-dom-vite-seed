import { IConstraint, IConstraintTestFunctionResult } from '../../constraint/constraint.type';
import { createConstraint } from '../../constraint/create-constraint';

export interface IMinLengthConstraintProperties {
  readonly minLength: number;
}

export function minLengthConstraint(
  minLength: number,
): IConstraint<string, IMinLengthConstraintProperties> {
  return createConstraint<string, IMinLengthConstraintProperties>(
    (value: string): IConstraintTestFunctionResult<IMinLengthConstraintProperties> => {
      return (value.length < minLength)
        ? ['minLength']
        : [];
    },
    {
      minLength,
    },
  );
}
