import { IIsNumberConstraintProperties, isNumberConstraint } from '../../../constraints/built-in/number/is-number-constraint';
import { INumberRangeConstraintProperties, numberRangeConstraint } from '../../../constraints/built-in/number/number-range-constraint';
import { IInvalidTypeConstraintProperties } from '../../../constraints/built-in/other/invalid-type-constraint';
import { IConstraint } from '../../../constraints/constraint/constraint.type';
import { NO_CONSTRAINT } from '../../../constraints/constraint/no-constraint.constant';
import { multipleConstraints } from '../../../constraints/multiple/multiple-constraints';
import { formInputConstraint, IFormInputConstraintOptions } from '../../types/constraint/form-input-constraint';
import { IFormInputValue } from '../../types/form-input-value.type';

export interface IFormInputNumberConstraintProperties extends //
  IFormInputConstraintOptions<'number'>,
  IIsNumberConstraintProperties,
  INumberRangeConstraintProperties
  //
{
}

export type IFormInputNumberConstraintOptions =
  Partial<Omit<IFormInputNumberConstraintProperties, keyof IInvalidTypeConstraintProperties<'number'>>>
  ;

export type IFormInputNumberConstraint = IConstraint<IFormInputValue<number>, IFormInputNumberConstraintProperties>;

export function formInputNumberConstraint(
  {
    min,
    max,
    step,
    ...options
  }: IFormInputNumberConstraintOptions = {},
): IFormInputNumberConstraint {

  const constraints: IConstraint<number, any>[] = [
    isNumberConstraint(),
  ];

  if (
    (min !== void 0)
    || (max !== void 0)
    || (step !== void 0)
  ) {
    constraints.push(
      numberRangeConstraint({
        min,
        max,
        step,
      }),
    );
  }

  return formInputConstraint(
    {
      type: 'number',
      ...options,
    },
    (constraints.length === 0)
      ? NO_CONSTRAINT
      : multipleConstraints(
        'sequential',
        constraints,
      ),
  );
}

// export function formInputNumberConstraint(
//   {
//     required = false,
//     min,
//     max,
//     step,
//   }: IFormInputNumberConstraintOptions = {},
// ): IConstraint<number | INullish, IFormInputNumberConstraintProperties> {
//   return requiredConstraint(
//     required,
//     groupConstraints(
//       'sequential',
//       isNumberConstraint(),
//       numberRangeConstraint({
//         min,
//         max,
//         step,
//       }),
//     ),
//   );
// }
