import { IConstraintTestFunctionResult, IGenericConstraint } from '../../../constraints/constraint/constraint.type';
import { IFormInputConstraintProperties } from './form-input-constraint-properties.type';

export type IFormInputValidity<GConstraint extends IGenericConstraint> = IConstraintTestFunctionResult<IFormInputConstraintProperties<GConstraint>>;

