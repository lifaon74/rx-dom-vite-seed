import { math_max } from '@lifaon/math';
import { IConstraint, IConstraintTestFunctionResult } from '../../constraint/constraint.type';
import { createConstraint } from '../../constraint/create-constraint';

export interface INumberRangeConstraintProperties {
  readonly min: number;
  readonly max: number;
  readonly step: number;
}

export type INumberRangeConstraintOptions = Partial<INumberRangeConstraintProperties>;

export function numberRangeConstraint(
  {
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
    step = 0,
  }: INumberRangeConstraintOptions,
): IConstraint<number, INumberRangeConstraintProperties> {
  step = math_max(0, step);

  return createConstraint<number, INumberRangeConstraintProperties>(
    (value: number): IConstraintTestFunctionResult<INumberRangeConstraintProperties> => {
      if (value >= min) {
        if (value <= max) {
          if (step === 0) {
            return [];
          } else {
            const start: number = Number.isFinite(min)
              ? min
              : 0;
            const v: number = ((value - start) / step);
            return (Math.trunc(v) === v)
              ? []
              : ['step'];
          }
        } else {
          return ['max'];
        }
      } else {
        return ['min'];
      }
    },
    {
      min,
      max,
      step,
    },
  );
}
