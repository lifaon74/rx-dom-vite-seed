import { IInvalidTypeConstraintProperties, invalidTypeConstraint } from '../../../constraints/built-in/other/invalid-type-constraint';
import {
  IRequiredConstraintAllProperties,
  IRequiredConstraintProperties,
  requiredConstraint,
} from '../../../constraints/built-in/other/required-constraint';
import { IConstraint } from '../../../constraints/constraint/constraint.type';
import { IValueOrNoValueToken } from '../../../tokens/no-value.token';
import { IFormInputValue } from '../form-input-value.type';

export interface IFormInputConstraintProperties<GType extends string> extends //
  IInvalidTypeConstraintProperties<GType>,
  IRequiredConstraintProperties
  //
{
}

export type IInvalidTypeConstraintAllProperties<GType extends string, GProperties extends object> =
  GProperties
  & IFormInputConstraintProperties<GType>
  ;

export type IFormInputConstraintOptions<GType extends string> =
  Partial<Omit<IFormInputConstraintProperties<GType>, keyof IInvalidTypeConstraintProperties<GType>>>
  & Pick<IFormInputConstraintProperties<GType>, keyof IInvalidTypeConstraintProperties<GType>>;

export type IFormInputConstraint<GType extends string, GValue, GProperties extends object> = IConstraint<IFormInputValue<GValue>, IInvalidTypeConstraintAllProperties<GType, GProperties>>;

export function formInputConstraint<GType extends string, GValue, GProperties extends object>(
  {
    type,
    required = false,
  }: IFormInputConstraintOptions<GType>,
  constraint: IConstraint<GValue, GProperties>,
): IFormInputConstraint<GType, GValue, GProperties> {
  return invalidTypeConstraint<GType, IValueOrNoValueToken<GValue>, IRequiredConstraintAllProperties<GProperties>>(
    type,
    requiredConstraint<GValue, GProperties>(
      required,
      constraint,
    ),
  );
}
