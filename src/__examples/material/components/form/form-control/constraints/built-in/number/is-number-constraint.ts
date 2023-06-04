import { IConstraint, IConstraintTestFunctionResult } from '../../constraint/constraint.type';
import { createConstraint } from '../../constraint/create-constraint';

export interface IIsNumberConstraintProperties {
  readonly type: 'number';
}

export function isNumberConstraint(): IConstraint<number, IIsNumberConstraintProperties> {
  return createConstraint<number, IIsNumberConstraintProperties>(
    (value: number): IConstraintTestFunctionResult<IIsNumberConstraintProperties> => {
      return Number.isNaN(value)
        ? ['type']
        : [];
    },
    {
      type: 'number',
    },
  );
}
