import { IGenericConstraint } from '../../../constraints/constraint/constraint.type';
import { IFormInputConstraintProperties } from './form-input-constraint-properties.type';

export type IFormInputError<GConstraint extends IGenericConstraint> = keyof IFormInputConstraintProperties<GConstraint>;
