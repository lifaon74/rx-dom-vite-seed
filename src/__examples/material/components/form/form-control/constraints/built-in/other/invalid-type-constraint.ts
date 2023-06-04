import { INVALID_TYPE_TOKEN, IValueOrInvalidTypeToken } from '../../../tokens/invalid-type.token';
import { IConstraint, IConstraintTestFunctionResult } from '../../constraint/constraint.type';
import { createConstraint } from '../../constraint/create-constraint';

export interface IInvalidTypeConstraintProperties<GType extends string> {
  readonly type: GType;
}

export type IInvalidTypeConstraintAllProperties<GType extends string, GProperties extends object> =
  GProperties
  & IInvalidTypeConstraintProperties<GType>
  ;

export type IInvalidTypeConstraint<GType extends string, GValue, GProperties extends object> = IConstraint<IValueOrInvalidTypeToken<GValue>, IInvalidTypeConstraintAllProperties<GType, GProperties>>;

export function invalidTypeConstraint<GType extends string, GValue, GProperties extends object>(
  type: GType,
  {
    test,
    properties,
  }: IConstraint<GValue, GProperties>,
): IInvalidTypeConstraint<GType, GValue, GProperties> {
  return createConstraint<IValueOrInvalidTypeToken<GValue>, IInvalidTypeConstraintAllProperties<GType, GProperties>>(
    (value: IValueOrInvalidTypeToken<GValue>): IConstraintTestFunctionResult<IInvalidTypeConstraintAllProperties<GType, GProperties>> => {
      return (value === INVALID_TYPE_TOKEN)
        ? ['type']
        : test(value);
    },
    {
      ...properties,
      type,
    },
  );
}
