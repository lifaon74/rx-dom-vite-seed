import { IValueOrNoValueToken, NO_VALUE_TOKEN } from '../../../tokens/no-value.token';
import { IConstraint, IConstraintTestFunctionResult } from '../../constraint/constraint.type';
import { createConstraint } from '../../constraint/create-constraint';

export interface IRequiredConstraintProperties {
  readonly required: boolean;
}

export type IRequiredConstraintAllProperties<GProperties extends object> =
  GProperties
  & IRequiredConstraintProperties
  ;

export type IRequiredConstraint<GValue, GProperties extends object> = IConstraint<IValueOrNoValueToken<GValue>, IRequiredConstraintAllProperties<GProperties>>;

export function requiredConstraint<GValue, GProperties extends object>(
  required: boolean,
  {
    test,
    properties,
  }: IConstraint<GValue, GProperties>,
): IRequiredConstraint<GValue, GProperties> {
  return createConstraint<IValueOrNoValueToken<GValue>, IRequiredConstraintAllProperties<GProperties>>(
    (value: IValueOrNoValueToken<GValue>): IConstraintTestFunctionResult<IRequiredConstraintAllProperties<GProperties>> => {
      return (value === NO_VALUE_TOKEN)
        ? (required ? ['required'] : [])
        : test(value);
    },
    {
      ...properties,
      required,
    },
  );
}
