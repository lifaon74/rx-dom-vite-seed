import { ILocalesInput } from '../locale/locales-input.type';
import { INumberFormatFunction } from './number-format-function.type';

export function createNumberFormatFunction(
  locales?: ILocalesInput,
  _options?: Intl.NumberFormatOptions,
): INumberFormatFunction {
  return (
    value: number,
    options?: Intl.NumberFormatOptions,
  ): string => {
    return new Intl.NumberFormat(
      locales as any,
      {
        ..._options,
        ...options,
      },
    ).format(value);
  };
}
