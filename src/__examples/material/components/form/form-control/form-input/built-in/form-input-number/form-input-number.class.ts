import { IFormInputConstraint } from '../../types/constraint/form-input-constraint.type';
import { IFormInputWithConstraintBuilderOptions } from '../../shared/form-input-with-constraint-builder.class';
import { FormInputWithRequiredConstraintBuilder } from '../../shared/form-input-with-required-constraint-builder.class';
import { formInputNumberConstraint, IFormInputNumberConstraintOptions } from './form-input-number-constraint';

export interface IFormInputNumberOptions extends IFormInputWithConstraintBuilderOptions<number, IFormInputConstraint<number>, IFormInputNumberConstraintOptions> {
}

export class FormInputNumber<GName extends string> extends FormInputWithRequiredConstraintBuilder<GName, number, IFormInputConstraint<number>, IFormInputNumberConstraintOptions> {
  constructor(
    name: GName,
    options?: IFormInputNumberOptions,
  ) {
    super(name, formInputNumberConstraint, options);
  }
}
