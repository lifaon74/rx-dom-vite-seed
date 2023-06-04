import { IConstraint, IConstraintTestFunction } from './constraint.type';

export function createConstraint<GValue, GProperties extends object>(
  test: IConstraintTestFunction<GValue, GProperties>,
  properties: GProperties,
): IConstraint<GValue, GProperties> {
  return {
    test,
    properties,
  };
}
