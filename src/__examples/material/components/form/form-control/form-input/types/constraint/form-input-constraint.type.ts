import { IConstraint } from '../../../constraints/constraint/constraint.type';
import { IFormInputValue } from '../form-input-value.type';

export type IFormInputConstraint<GValue> = IConstraint<IFormInputValue<GValue>, any>;
