import { INumberFormatFunction } from './number-format-function.type';

export function createNumberFormatFunctionFromNumberFormat(
  numberFormat: Intl.NumberFormat,
): INumberFormatFunction {
  return (
    value: number,
  ): string => {
    return numberFormat.format(value);
  };
}
