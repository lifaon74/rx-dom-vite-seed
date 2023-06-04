import {
  $$distinct,
  $$map,
  createMulticastReplayLastSource, filter$$,
  function$$,
  IObservable,
  IObserver, map$$,
  readObservableValue,
  shareRL$$,
  UNABLE_TO_READ_OBSERVABLE,
} from '@lirx/core';
import { uuid } from '@lirx/dom';
import { IInputOrTextAreaVirtualReactiveElementNode } from '../../inputs/helpers/is-input-or-text-area-virtual-reactive-element-node';
import { mapDistinctShareRL$$ } from '../../misc/map-distinct-share-replay-last-observable';
import { IGenericConstraint } from '../constraints/constraint/constraint.type';
import { createConstraint } from '../constraints/constraint/create-constraint';
import { NO_CONSTRAINT } from '../constraints/constraint/no-constraint.constant';
import { INoValueToken, NO_VALUE_TOKEN } from '../tokens/no-value.token';
import { IFormInputError } from './types/constraint/form-input-error.type';
import { IFormInputValidity } from './types/constraint/form-input-validity.type';
import { IFormInputConstraint } from './types/constraint/form-input-constraint.type';
import { IFormInputValue } from './types/form-input-value.type';


export interface IFormInputOptions<GValue, GConstraint extends IFormInputConstraint<GValue>> {
  value?: IFormInputValue<GValue>;
  disabled?: boolean;
  readonly?: boolean;
  constraint?: GConstraint;
}

export class FormInput<GName extends string, GValue, GConstraint extends IFormInputConstraint<GValue>> {
  protected readonly _id: string;

  protected readonly _name: GName;

  protected readonly _value$: IObservable<IFormInputValue<GValue>>;
  protected readonly _$value: IObserver<IFormInputValue<GValue>>;

  protected readonly _disabled$: IObservable<boolean>;
  protected readonly _$disabled: IObserver<boolean>;

  protected readonly _readonly$: IObservable<boolean>;
  protected readonly _$readonly: IObserver<boolean>;

  protected readonly _dirty$: IObservable<boolean>;
  protected readonly _$dirty: IObserver<boolean>;

  protected readonly _touched$: IObservable<boolean>;
  protected readonly _$touched: IObserver<boolean>;

  protected readonly _constraint$: IObservable<GConstraint>;
  protected readonly _$constraint: IObserver<GConstraint>;

  protected readonly _validity$: IObservable<IFormInputValidity<GConstraint>>;
  protected readonly _isValid$: IObservable<boolean>;

  constructor(
    name: GName,
    {
      value = NO_VALUE_TOKEN,
      disabled = false,
      readonly = false,
      constraint = NO_CONSTRAINT as GConstraint,
    }: IFormInputOptions<GValue, GConstraint> = {},
  ) {
    this._id = uuid();
    this._name = name;

    /* VALUE */

    const $value$ = createMulticastReplayLastSource<IFormInputValue<GValue>>();

    const value$ = $value$.subscribe;
    const $value = $$distinct($value$.emit);
    $value(value);

    this._value$ = value$;
    this._$value = $value;

    /* DISABLED */

    const $disabled$ = createMulticastReplayLastSource<boolean>();

    const disabled$ = $disabled$.subscribe;
    const $disabled = $$distinct($disabled$.emit);
    const isDisabled = $disabled$.getValue;
    $disabled(disabled);

    this._disabled$ = disabled$;
    this._$disabled = $disabled;

    /* READONLY */

    const $readonly$ = createMulticastReplayLastSource<boolean>();

    const readonly$ = $readonly$.subscribe;
    const $readonly = $$distinct($readonly$.emit);
    $readonly(readonly);

    this._readonly$ = readonly$;
    this._$readonly = $readonly;

    /* DIRTY */

    const $dirty$ = createMulticastReplayLastSource<boolean>();

    const dirty$ = $dirty$.subscribe;
    const $dirty = $$distinct($dirty$.emit);

    this._dirty$ = dirty$;
    this._$dirty = $dirty;

    /* TOUCHED */

    const $touched$ = createMulticastReplayLastSource<boolean>();

    const touched$ = $touched$.subscribe;
    const $touched = $$distinct($touched$.emit);

    this._touched$ = touched$;
    this._$touched = $touched;

    /* CONSTRAINT */

    const $constraint$ = createMulticastReplayLastSource<GConstraint>();

    const constraint$ = $constraint$.subscribe;
    const $constraint = $$map($constraint$.emit, ({ test, properties }: GConstraint): GConstraint => {
      return createConstraint(
        (value: any): any => {
          // TODO maybe readonly too ?
          return isDisabled()
            ? []
            : test(value);
        },
        properties,
      ) as GConstraint;
    });

    $constraint(constraint);

    this._constraint$ = constraint$;
    this._$constraint = $constraint;

    /* VALIDITY */

    const validity$ = shareRL$$(
      function$$(
        [constraint$, value$],
        (constraintWithDisabled: GConstraint, value: IFormInputValue<GValue>): IFormInputValidity<GConstraint> => {
          return constraintWithDisabled.test(value);
        }),
    );

    this._validity$ = validity$;

    const isValid$ = mapDistinctShareRL$$(validity$, _ => _.length === 0);

    this._isValid$ = isValid$;
  }

  /* ID */

  get id(): string {
    return this._id;
  }

  /* NAME */

  get name(): GName {
    return this._name;
  }

  /* VALUE */

  get value(): IFormInputValue<GValue> {
    return readObservableValue(
      this._value$,
      UNABLE_TO_READ_OBSERVABLE,
    );
  }

  set value(
    input: IFormInputValue<GValue>,
  ) {
    this._$value(input);
  }

  get value$(): IObservable<IFormInputValue<GValue>> {
    return this._value$;
  }

  get $value(): IObserver<IFormInputValue<GValue>> {
    return this._$value;
  }

  /* DISABLED */

  get disabled(): boolean {
    return readObservableValue(
      this._disabled$,
      UNABLE_TO_READ_OBSERVABLE,
    );
  }

  set disabled(
    input: boolean,
  ) {
    this._$disabled(input);
  }

  get disabled$(): IObservable<boolean> {
    return this._disabled$;
  }

  get $disabled(): IObserver<boolean> {
    return this._$disabled;
  }

  /* READONLY */

  get readonly(): boolean {
    return readObservableValue(
      this._readonly$,
      UNABLE_TO_READ_OBSERVABLE,
    );
  }

  set readonly(
    input: boolean,
  ) {
    this._$readonly(input);
  }

  get readonly$(): IObservable<boolean> {
    return this._readonly$;
  }

  get $readonly(): IObserver<boolean> {
    return this._$readonly;
  }

  /* DIRTY */

  get dirty(): boolean {
    return readObservableValue(
      this._dirty$,
      UNABLE_TO_READ_OBSERVABLE,
    );
  }

  set dirty(
    input: boolean,
  ) {
    this._$dirty(input);
  }

  get dirty$(): IObservable<boolean> {
    return this._dirty$;
  }

  get $dirty(): IObserver<boolean> {
    return this._$dirty;
  }

  /* TOUCHED */

  get touched(): boolean {
    return readObservableValue(
      this._touched$,
      UNABLE_TO_READ_OBSERVABLE,
    );
  }

  set touched(
    input: boolean,
  ) {
    this._$touched(input);
  }

  get touched$(): IObservable<boolean> {
    return this._touched$;
  }

  get $touched(): IObserver<boolean> {
    return this._$touched;
  }

  /* CONSTRAINT */

  get constraint(): GConstraint {
    return readObservableValue(
      this._constraint$,
      UNABLE_TO_READ_OBSERVABLE,
    );
  }

  set constraint(
    input: GConstraint,
  ) {
    this._$constraint(input);
  }

  get constraint$(): IObservable<GConstraint> {
    return this._constraint$;
  }

  get $constraint(): IObserver<GConstraint> {
    return this._$constraint;
  }

  /* VALIDITY */

  get validity$(): IObservable<IFormInputValidity<GConstraint>> {
    return this._validity$;
  }

  get isValid$(): IObservable<boolean> {
    return this._isValid$;
  }

  hasError$(
    name: IFormInputError<GConstraint>,
  ): IObservable<boolean> {
    return map$$(this._validity$, validity => validity.includes(name));
  }

  /* METHODS */

  reset(): void {
    this._$value(NO_VALUE_TOKEN);
  }

  get reset$(): IObservable<INoValueToken> {
    return filter$$<IFormInputValue<GValue>, INoValueToken>(this._value$, (value: IFormInputValue<GValue>): value is INoValueToken => {
      return value === NO_VALUE_TOKEN;
    });
  }
}

export type IGenericFormInput = FormInput<any, any, IGenericConstraint>;

export type InferFormInputName<GFormInput extends IGenericFormInput> =
  GFormInput extends FormInput<infer GName, any, IGenericConstraint>
    ? GName
    : never;


