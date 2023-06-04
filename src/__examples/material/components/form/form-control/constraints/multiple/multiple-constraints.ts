import { IConstraint, IConstraintTestFunction, IConstraintTestFunctionResult } from '../constraint/constraint.type';
import { createConstraint } from '../constraint/create-constraint';

export function multipleConstraints<GValue, GProperties extends object>(
  mode: 'sequential' | 'parallel',
  constraints: readonly IConstraint<GValue, GProperties>[],
): IConstraint<GValue, GProperties> {
  const properties: GProperties = {} as any;

  for (let i = 0, l = constraints.length; i < l; i++) {
    Object.assign(properties, constraints[i].properties);
  }

  const getTestFunction = (): IConstraintTestFunction<GValue, GProperties> => {
    switch (mode) {
      case 'sequential':
        return (value: GValue): IConstraintTestFunctionResult<GProperties> => {
          return constraints.reduce((errors: IConstraintTestFunctionResult<GProperties>, { test }: IConstraint<GValue, GProperties>): IConstraintTestFunctionResult<GProperties> => {
            return (errors.length === 0)
              ? test(value)
              : errors;
          }, []);
        };
      case 'parallel':
        return (value: GValue): IConstraintTestFunctionResult<GProperties> => {
          return constraints.flatMap(({ test }: IConstraint<GValue, GProperties>): IConstraintTestFunctionResult<GProperties> => {
            return test(value);
          });
        };
    }
  };

  return createConstraint<GValue, GProperties>(
    getTestFunction(),
    properties,
  );
}
