import { IFormInputConstraint } from '../types/constraint/form-input-constraint.type';
import { FormInput, IFormInputOptions } from '../form-input.class';

export type IFormInputWithConstraintBuilderOptions<GValue, GConstraint extends IFormInputConstraint<GValue>, GOptions extends object> =
  Omit<IFormInputOptions<GValue, GConstraint>, 'constraint'>
  & GOptions
  ;

export interface IFormInputWithConstraintBuilderFunction<GValue, GConstraint extends IFormInputConstraint<GValue>, GOptions extends object> {
  (
    options: GOptions,
  ): GConstraint;
}

export class FormInputWithConstraintBuilder<GName extends string, GValue, GConstraint extends IFormInputConstraint<GValue>, GOptions extends object> extends FormInput<GName, GValue, GConstraint> {
  protected _constraintBuilder: IFormInputWithConstraintBuilderFunction<GValue, GConstraint, GOptions>;

  constructor(
    name: GName,
    constraintBuilder: IFormInputWithConstraintBuilderFunction<GValue, GConstraint, GOptions>,
    options: IFormInputWithConstraintBuilderOptions<GValue, GConstraint, GOptions> = {} as IFormInputWithConstraintBuilderOptions<GValue, GConstraint, GOptions>,
  ) {
    super(name, {
      ...options,
      constraint: constraintBuilder(options),
    });
    this._constraintBuilder = constraintBuilder;
  }

  updateConstraint(
    options: Partial<GOptions>,
  ): void {
    this.replaceConstraint({
      ...this.constraint.properties,
      ...options,
    });
  }

  replaceConstraint(
    options: GOptions,
  ): void {
    this.constraint = this._constraintBuilder(options);
  }
}
