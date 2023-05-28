import { math_floor, math_max, math_min } from '@lifaon/math';
import {
  $$distinct, $$map,
  $log,
  createMulticastReplayLastSource,
  function$$,
  IObservable,
  IObserver, map$$,
  mapDistinct$$,
  readObservableValue, shareRL$$,
  single,
  switchMap$$,
  UNABLE_TO_READ_OBSERVABLE,
} from '@lirx/core';
import { INullish, isNullish, TupleTypes, UnionToIntersection } from '@lirx/utils';

/*------------------------------*/

export type IConstraintTestFunctionResult<GProperties extends object> = (keyof GProperties)[];

export interface IConstraintTestFunction<GValue, GProperties extends object> {
  (
    value: GValue,
  ): IConstraintTestFunctionResult<GProperties>;
}

export interface IConstraint<GValue, GProperties extends object> {
  readonly test: IConstraintTestFunction<GValue, GProperties>;
  readonly properties: GProperties;
}

export type IGenericConstraint = IConstraint<any, any>;

export function createConstraint<GValue, GProperties extends object>(
  test: IConstraintTestFunction<GValue, GProperties>,
  properties: GProperties,
): IConstraint<GValue, GProperties> {
  return {
    test,
    properties,
  };
}

export const NO_CONSTRAINT = createConstraint<any, any>(() => [], {});

export type InferConstraintValue<GConstraint extends IGenericConstraint> =
  GConstraint extends IConstraint<infer GValue, any>
    ? GValue
    : never;

export type InferConstraintProperties<GConstraint extends IGenericConstraint> =
  GConstraint extends IConstraint<any, infer GProperties>
    ? GProperties
    : never;

export type IGroupConstraintsConstraint<GFirstConstraint extends IGenericConstraint> = IConstraint<InferConstraintValue<GFirstConstraint>, any>;

export type InferGroupConstraintsPropertiesRaw<GConstraints extends readonly IGenericConstraint[]> = Extract<
  UnionToIntersection<
    TupleTypes<{
      [GKey in keyof GConstraints]: InferConstraintProperties<GConstraints[GKey]>;
    }>
  >,
  object
>;

export type InferGroupConstraintsProperties<GFirstConstraint extends IGenericConstraint, GConstraints extends readonly IGenericConstraint[]> =
  InferGroupConstraintsPropertiesRaw<[GFirstConstraint, ...GConstraints]>;

export function groupConstraints<GFirstConstraint extends IGenericConstraint, GConstraints extends readonly IGroupConstraintsConstraint<GFirstConstraint>[]>(
  mode: 'sequential' | 'parallel',
  firstConstraint: GFirstConstraint,
  ...constraints: GConstraints
): IConstraint<InferConstraintValue<GFirstConstraint>, InferGroupConstraintsProperties<GFirstConstraint, GConstraints>> {
  type GValue = InferConstraintValue<GFirstConstraint>;
  type GProperties = InferGroupConstraintsProperties<GFirstConstraint, GConstraints>;

  const properties: GProperties = {} as any;

  for (let i = 0, l = constraints.length; i < l; i++) {
    Object.assign(properties, constraints[i].properties);
  }

  const getTestFunction = (): IConstraintTestFunction<GValue, GProperties> => {
    switch (mode) {
      case 'sequential':
        return (value: GValue): IConstraintTestFunctionResult<GProperties> => {
          return constraints.reduce((errors: IConstraintTestFunctionResult<GProperties>, { test }: IConstraint<GValue, GProperties>): IConstraintTestFunctionResult<GProperties> => {
            return (errors.length === 0)
              ? test(value)
              : errors;
          }, []);
        };
      case 'parallel':
        return (value: GValue): IConstraintTestFunctionResult<GProperties> => {
          return constraints.flatMap(({ test }: IConstraint<GValue, GProperties>): IConstraintTestFunctionResult<GProperties> => {
            return test(value);
          });
        };
    }
  };

  return createConstraint<GValue, GProperties>(
    getTestFunction(),
    properties,
  ) as any;
}

export interface IRequiredConstraintProperties {
  required: boolean;
}

export function requiredConstraint<GValue, GProperties extends object>(
  required: boolean,
  {
    test,
    properties,
  }: IConstraint<GValue, GProperties>,
): IConstraint<GValue | INullish, GProperties & IRequiredConstraintProperties> {
  return createConstraint<GValue | INullish, GProperties & IRequiredConstraintProperties>(
    (value: GValue | INullish): IConstraintTestFunctionResult<GProperties & IRequiredConstraintProperties> => {
      return isNullish(value)
        ? (required ? ['required'] : [])
        : test(value);
    },
    {
      ...properties,
      required,
    },
  );
}

/*----*/

export interface IMinLengthConstraintProperties {
  minLength: number;
}

export function minLengthConstraint(
  minLength: number,
): IConstraint<string, IMinLengthConstraintProperties> {
  return createConstraint<string, IMinLengthConstraintProperties>(
    (value: string): IConstraintTestFunctionResult<IMinLengthConstraintProperties> => {
      return (value.length < minLength)
        ? ['minLength']
        : [];
    },
    {
      minLength,
    },
  );
}

export interface IMaxLengthConstraintProperties {
  maxLength: number;
}

export function maxLengthConstraint(
  maxLength: number,
): IConstraint<string, IMaxLengthConstraintProperties> {
  return createConstraint<string, IMaxLengthConstraintProperties>(
    (value: string): IConstraintTestFunctionResult<IMaxLengthConstraintProperties> => {
      return (value.length > maxLength)
        ? ['maxLength']
        : [];
    },
    {
      maxLength,
    },
  );
}

export interface IPatternConstraintProperties {
  pattern: RegExp;
}

export function patternConstraint(
  pattern: RegExp,
): IConstraint<string, IPatternConstraintProperties> {
  return createConstraint<string, IPatternConstraintProperties>(
    (value: string): IConstraintTestFunctionResult<IPatternConstraintProperties> => {
      pattern.lastIndex = 0;
      return pattern.test(value)
        ? []
        : ['pattern'];
    },
    {
      pattern,
    },
  );
}

export interface IFormInputTextConstraintProperties extends //
  IRequiredConstraintProperties,
  IMinLengthConstraintProperties,
  IMaxLengthConstraintProperties,
  IPatternConstraintProperties
  //
{
}

export type IFormInputTextConstraintOptions = Partial<IFormInputTextConstraintProperties>;

export function formInputTextConstraint(
  {
    required = false,
    minLength = 0,
    maxLength = Number.POSITIVE_INFINITY,
    pattern = /.*/,
  }: IFormInputTextConstraintOptions = {},
): IConstraint<string | INullish, IFormInputTextConstraintProperties> {
  return requiredConstraint(
    required,
    groupConstraints(
      'sequential',
      minLengthConstraint(minLength),
      maxLengthConstraint(maxLength),
      patternConstraint(pattern),
    ),
  );
}

/*----*/

export interface IIsNumberConstraintProperties {
  type: 'number';
}

export function isNumberConstraint(): IConstraint<number, IIsNumberConstraintProperties> {
  return createConstraint<number, IIsNumberConstraintProperties>(
    (value: number): IConstraintTestFunctionResult<IIsNumberConstraintProperties> => {
      return Number.isNaN(value)
        ? ['type']
        : [];
    },
    {
      type: 'number',
    },
  );
}

export interface INumberRangeConstraintProperties {
  min: number;
  max: number;
  step: number;
}

export type INumberRangeConstraintOptions = Partial<INumberRangeConstraintProperties>;

export function numberRangeConstraint(
  {
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
    step = 0,
  }: INumberRangeConstraintOptions,
): IConstraint<number, INumberRangeConstraintProperties> {
  step = math_max(0, step);

  return createConstraint<number, INumberRangeConstraintProperties>(
    (value: number): IConstraintTestFunctionResult<INumberRangeConstraintProperties> => {
      if (value >= min) {
        if (value <= max) {
          if (step === 0) {
            return [];
          } else {
            const start: number = Number.isFinite(min)
              ? min
              : 0;
            const v: number = ((value - start) / step);
            return (Math.trunc(v) === v)
              ? []
              : ['step'];
          }
        } else {
          return ['max'];
        }
      } else {
        return ['min'];
      }
    },
    {
      min,
      max,
      step,
    },
  );
}

export interface IFormInputNumberConstraintProperties extends //
  IRequiredConstraintProperties,
  IIsNumberConstraintProperties,
  INumberRangeConstraintProperties
  //
{
}

export type IFormInputNumberConstraintOptions = Partial<IFormInputNumberConstraintProperties>;

export function formInputNumberConstraint(
  {
    required = false,
    min,
    max,
    step,
  }: IFormInputNumberConstraintOptions = {},
): IConstraint<number | INullish, IFormInputNumberConstraintProperties> {
  return requiredConstraint(
    required,
    groupConstraints(
      'sequential',
      isNumberConstraint(),
      numberRangeConstraint({
        min,
        max,
        step,
      }),
    ),
  );
}

/*------------------------------*/

export type IFormInputValue<GValue> = GValue | null;
export type IFormInputConstraint<GValue> = IConstraint<IFormInputValue<GValue>, any>;
export type IFormInputConstraintProperties<GConstraint extends IGenericConstraint> = InferConstraintProperties<GConstraint>;
export type IFormInputValidity<GConstraint extends IGenericConstraint> = IConstraintTestFunctionResult<IFormInputConstraintProperties<GConstraint>>;

export interface IFormInputOptions<GValue, GConstraint extends IFormInputConstraint<GValue>> {
  value?: IFormInputValue<GValue>;
  disabled?: boolean;
  constraint?: GConstraint;
}

export class FormInput<GName extends string, GValue, GConstraint extends IFormInputConstraint<GValue>> {
  protected readonly _name: GName;

  protected readonly _value$: IObservable<IFormInputValue<GValue>>;
  protected readonly _$value: IObserver<IFormInputValue<GValue>>;

  protected readonly _disabled$: IObservable<boolean>;
  protected readonly _$disabled: IObserver<boolean>;

  protected readonly _constraint$: IObservable<GConstraint>;
  protected readonly _$constraint: IObserver<GConstraint>;

  protected readonly _validity$: IObservable<IFormInputValidity<GConstraint>>;
  protected readonly _isValid$: IObservable<boolean>;

  constructor(
    name: GName,
    {
      value = null,
      disabled = false,
      constraint = NO_CONSTRAINT as GConstraint,
    }: IFormInputOptions<GValue, GConstraint> = {},
  ) {
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

    /* CONSTRAINT */

    const $constraint$ = createMulticastReplayLastSource<GConstraint>();

    const constraint$ = $constraint$.subscribe;
    const $constraint = $$map($constraint$.emit, ({ test, properties }: GConstraint): GConstraint => {
      return createConstraint(
        (value: any): any => {
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

    const isValid$ = shareRL$$(
      mapDistinct$$(validity$, _ => _.length === 0),
    );

    this._isValid$ = isValid$;
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

  /* METHODS */

  reset(): void {
    this._$value(null);
  }
}

export type IGenericFormInput = FormInput<any, any, any>;

/*----*/

export interface IFormInputTextOptions<GConstraint extends IFormInputConstraint<string>> extends IFormInputOptions<string, GConstraint> {
}

export class FormInputText<GName extends string, GConstraint extends IFormInputConstraint<string>> extends FormInput<GName, string, GConstraint> {
  constructor(
    name: GName,
    options?: IFormInputTextOptions<GConstraint>,
  ) {
    super(name, options);
  }
}

/*----*/

export interface IFormInputNumberOptions<GConstraint extends IFormInputConstraint<number>> extends IFormInputOptions<number, GConstraint> {
}

export class FormInputNumber<GName extends string, GConstraint extends IFormInputConstraint<number>> extends FormInput<GName, number, GConstraint> {
  constructor(
    name: GName,
    options?: IFormInputNumberOptions<GConstraint>,
  ) {
    super(name, options);
  }
}

/*------------------------------*/

/*------------------------------*/

// function debug() {
//   function constraint() {
//     if (min < value && value < max) {
//
//     }
//   }
//
//   function constraintA(value: number | null) {
//     if (isNullish(value)) {
//       throw 'required';
//     } else {
//       if (inRange(value, 0, 5)) {
//         return true;
//       } else {
//         throw 'out-of-range';
//       }
//     }
//   }
//
//   function constraintB(value: number | null) {
//     if (isNullish(value)) {
//       return true;
//     } else {
//       if (inRange(value, 0, 5)) {
//
//       }
//     }
//   }
//
//   function required(value: GValue | INullish): any {
//
//   }
//
//   function constraintC(value: number | null) {
//     return required(value, () => {
//
//     });
//     if (isNullish(value)) {
//       return true;
//     } else {
//       if (inRange(value, 0, 5)) {
//
//       }
//     }
//   }
//
// }

async function formControlExample1() {
  const stringConstraint = () => {
    const constraint = new RequiredConstraint(
      new StringPatternConstraint(/.+/),
      true,
    );

    console.log(constraint.test('a'));
    console.log(constraint.test(''));
    console.log(constraint.test(null));
    // console.log(constraint.test(4));

    console.log(isRequired(constraint));
  };

  const numberConstraint = () => {
    const constraint = new NumberRangeConstraint({
      step: 0.2,
    });

    console.log(constraint.test(4.2));
  };

  // stringConstraint();
  numberConstraint();
}

async function formControlExample2() {
  const inputText = new FormInputText('abc', {
    constraint: formInputTextConstraint({
      pattern: /.+/,
      required: false,
    }),
  });

  inputText.isValid$($log);
  (window as any).inputText = inputText;
}

async function formControlExample3() {
  const inputNumber = new FormInputNumber('abc', {
    constraint: formInputNumberConstraint({
      min: 0,
      max: 10,
      step: 1,
    }),
  });

  inputNumber.isValid$($log);
  (window as any).inputNumber = inputNumber;
}

/*------------------------------*/

export async function formControlExample() {
  // await formControlExample1();
  await formControlExample2();
}
