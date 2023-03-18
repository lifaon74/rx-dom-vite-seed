import { ILocalesInput } from '../locale/locales-input.type';
import { createNumberFormatFunctionFromNumberFormat } from './create-number-format-function-from-number-format';
import { INumberFormatFunction } from './number-format-function.type';

export function createNumberFormatFunction(
  locales?: ILocalesInput,
  options?: Intl.NumberFormatOptions,
): INumberFormatFunction {
  return createNumberFormatFunctionFromNumberFormat(
    new Intl.NumberFormat(
      locales as any,
      options,
    ),
  );
}
