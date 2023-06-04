import { IConstraint, IConstraintTestFunctionResult } from '../../constraint/constraint.type';
import { createConstraint } from '../../constraint/create-constraint';

export interface IPatternConstraintProperties {
  readonly pattern: RegExp;
}

export function patternConstraint(
  pattern: RegExp,
): IConstraint<string, IPatternConstraintProperties> {
  return createConstraint<string, IPatternConstraintProperties>(
    (value: string): IConstraintTestFunctionResult<IPatternConstraintProperties> => {
      pattern.lastIndex = 0;
      return pattern.test(value)
        ? []
        : ['pattern'];
    },
    {
      pattern,
    },
  );
}
