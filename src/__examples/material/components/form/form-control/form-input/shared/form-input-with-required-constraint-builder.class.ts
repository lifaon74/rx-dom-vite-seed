import { IObservable, IObserver, readObservableValue, UNABLE_TO_READ_OBSERVABLE } from '@lirx/core';
import { mapDistinctShareRL$$ } from '../../../misc/map-distinct-share-replay-last-observable';
import { IRequiredConstraintProperties } from '../../constraints/built-in/other/required-constraint';
import { IConstraint } from '../../constraints/constraint/constraint.type';
import { IFormInputValue } from '../types/form-input-value.type';
import {
  FormInputWithConstraintBuilder,
  IFormInputWithConstraintBuilderFunction,
  IFormInputWithConstraintBuilderOptions,
} from './form-input-with-constraint-builder.class';

export type IFormInputWithRequiredConstraintBuilderConstraint<GValue> =
  | IConstraint<IFormInputValue<GValue>, IRequiredConstraintProperties>
  | IConstraint<IFormInputValue<GValue>, any>
  ;

export class FormInputWithRequiredConstraintBuilder<//
  GName extends string,
  GValue,
  GConstraint extends IFormInputWithRequiredConstraintBuilderConstraint<GValue>,
  GOptions extends Partial<IRequiredConstraintProperties>
  //
> extends FormInputWithConstraintBuilder<GName, GValue, GConstraint, GOptions> {
  protected readonly _required$: IObservable<boolean>;
  protected readonly _$required: IObserver<boolean>;

  constructor(
    name: GName,
    constraintBuilder: IFormInputWithConstraintBuilderFunction<GValue, GConstraint, GOptions>,
    options: IFormInputWithConstraintBuilderOptions<GValue, GConstraint, GOptions> = {} as IFormInputWithConstraintBuilderOptions<GValue, GConstraint, GOptions>,
  ) {
    super(name, constraintBuilder, options);

    this._required$ = mapDistinctShareRL$$(this.constraint$, (constraint: IFormInputWithRequiredConstraintBuilderConstraint<GValue>): boolean => {
      return constraint.properties.required;
    });

    this._$required = (required: boolean): void => {
      this.updateConstraint({
        required,
      } as GOptions);
    };
  }

  /* REQUIRED */

  get required(): boolean {
    return readObservableValue(
      this._required$,
      UNABLE_TO_READ_OBSERVABLE,
    );
  }

  set required(
    input: boolean,
  ) {
    this._$required(input);
  }

  get required$(): IObservable<boolean> {
    return this._required$;
  }

  get $required(): IObserver<boolean> {
    return this._$required;
  }
}
