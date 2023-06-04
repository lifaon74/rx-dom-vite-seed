import { IInvalidTypeConstraintProperties } from '../../../constraints/built-in/other/invalid-type-constraint';
import { IMaxLengthConstraintProperties, maxLengthConstraint } from '../../../constraints/built-in/string/max-length-constraint';
import { IMinLengthConstraintProperties, minLengthConstraint } from '../../../constraints/built-in/string/min-length-constraint';
import { IPatternConstraintProperties, patternConstraint } from '../../../constraints/built-in/string/pattern-constraint';
import { IConstraint } from '../../../constraints/constraint/constraint.type';
import { NO_CONSTRAINT } from '../../../constraints/constraint/no-constraint.constant';
import { multipleConstraints } from '../../../constraints/multiple/multiple-constraints';
import { formInputConstraint, IFormInputConstraintOptions } from '../../types/constraint/form-input-constraint';
import { IFormInputValue } from '../../types/form-input-value.type';

export interface IFormInputTextConstraintProperties extends //
  IFormInputConstraintOptions<'text'>,
  Partial<IMinLengthConstraintProperties>,
  Partial<IMaxLengthConstraintProperties>,
  Partial<IPatternConstraintProperties>
  //
{
}

export type IFormInputTextConstraintOptions =
  Partial<Omit<IFormInputTextConstraintProperties, keyof IInvalidTypeConstraintProperties<'text'>>>
  ;

export type IFormInputTextConstraint = IConstraint<IFormInputValue<string>, IFormInputTextConstraintProperties>;

export function formInputTextConstraint(
  {
    minLength,
    maxLength,
    pattern,
    ...options
  }: IFormInputTextConstraintOptions = {},
): IFormInputTextConstraint {

  const constraints: IConstraint<string, any>[] = [];

  if (minLength !== void 0) {
    constraints.push(minLengthConstraint(minLength));
  }

  if (maxLength !== void 0) {
    constraints.push(maxLengthConstraint(maxLength));
  }

  if (pattern !== void 0) {
    constraints.push(patternConstraint(pattern));
  }

  return formInputConstraint(
    {
      type: 'text',
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

// export function formInputTextConstraint(
//   {
//     required = false,
//     minLength = 0,
//     maxLength = Number.POSITIVE_INFINITY,
//     pattern = /.*/,
//   }: IFormInputTextConstraintOptions = {},
// ): IFormInputTextConstraint {
//     return requiredConstraint(
//       required,
//       groupConstraints(
//         'sequential',
//         minLengthConstraint(minLength),
//         maxLengthConstraint(maxLength),
//         patternConstraint(pattern),
//       ),
//     );
// }
