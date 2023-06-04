import { IGenericConstraint, InferConstraintProperties } from '../../../constraints/constraint/constraint.type';

export type IFormInputConstraintProperties<GConstraint extends IGenericConstraint> = InferConstraintProperties<GConstraint>;
