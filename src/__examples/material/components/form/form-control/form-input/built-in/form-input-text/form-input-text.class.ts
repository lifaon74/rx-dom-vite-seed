import { IObservable, IObserver, readObservableValue, UNABLE_TO_READ_OBSERVABLE } from '@lirx/core';
import { mapDistinctShareRL$$ } from '../../../../misc/map-distinct-share-replay-last-observable';
import { IFormInputWithConstraintBuilderOptions } from '../../shared/form-input-with-constraint-builder.class';
import { FormInputWithRequiredConstraintBuilder } from '../../shared/form-input-with-required-constraint-builder.class';
import { formInputTextConstraint, IFormInputTextConstraint, IFormInputTextConstraintOptions } from './form-input-text-constraint';

export interface IFormInputTextOptions extends IFormInputWithConstraintBuilderOptions<string, IFormInputTextConstraint, IFormInputTextConstraintOptions> {

}

export class FormInputText<GName extends string> extends FormInputWithRequiredConstraintBuilder<GName, string, IFormInputTextConstraint, IFormInputTextConstraintOptions> {
  protected readonly _minLength$: IObservable<number | undefined>;
  protected readonly _$minLength: IObserver<number | undefined>;

  protected readonly _maxLength$: IObservable<number | undefined>;
  protected readonly _$maxLength: IObserver<number | undefined>;

  protected readonly _pattern$: IObservable<RegExp | undefined>;
  protected readonly _$pattern: IObserver<RegExp | undefined>;

  constructor(
    name: GName,
    options?: IFormInputTextOptions,
  ) {
    super(name, formInputTextConstraint, options);

    this._minLength$ = mapDistinctShareRL$$(this.constraint$, (constraint: IFormInputTextConstraint): number | undefined => {
      return constraint.properties.minLength;
    });

    this._$minLength = (minLength: number | undefined): void => {
      this.updateConstraint({
        minLength,
      });
    };

    this._maxLength$ = mapDistinctShareRL$$(this.constraint$, (constraint: IFormInputTextConstraint): number | undefined => {
      return constraint.properties.maxLength;
    });

    this._$maxLength = (maxLength: number | undefined): void => {
      this.updateConstraint({
        maxLength,
      });
    };

    this._pattern$ = mapDistinctShareRL$$(this.constraint$, (constraint: IFormInputTextConstraint): RegExp | undefined => {
      return constraint.properties.pattern;
    });

    this._$pattern = (pattern: RegExp | undefined): void => {
      this.updateConstraint({
        pattern,
      });
    };
  }

  /* MIN LENGTH */

  get minLength(): number | undefined {
    return readObservableValue(
      this._minLength$,
      UNABLE_TO_READ_OBSERVABLE,
    );
  }

  set minLength(
    input: number | undefined,
  ) {
    this._$minLength(input);
  }

  get minLength$(): IObservable<number | undefined> {
    return this._minLength$;
  }

  get $minLength(): IObserver<number | undefined> {
    return this._$minLength;
  }

  /* MAX LENGTH */

  get maxLength(): number | undefined {
    return readObservableValue(
      this._maxLength$,
      UNABLE_TO_READ_OBSERVABLE,
    );
  }

  set maxLength(
    input: number | undefined,
  ) {
    this._$maxLength(input);
  }

  get maxLength$(): IObservable<number | undefined> {
    return this._maxLength$;
  }

  get $maxLength(): IObserver<number | undefined> {
    return this._$maxLength;
  }

  /* PATTERN */

  get pattern(): RegExp | undefined {
    return readObservableValue(
      this._pattern$,
      UNABLE_TO_READ_OBSERVABLE,
    );
  }

  set pattern(
    input: RegExp | undefined,
  ) {
    this._$pattern(input);
  }

  get pattern$(): IObservable<RegExp | undefined> {
    return this._pattern$;
  }

  get $pattern(): IObserver<RegExp | undefined> {
    return this._$pattern;
  }
}

export type IGenericFormInputText = FormInputText<any>;
