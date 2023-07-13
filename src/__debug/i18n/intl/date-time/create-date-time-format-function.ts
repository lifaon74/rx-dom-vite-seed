import { ILocalesInput } from '../locale/locales-input.type';
import { IDateTimeFormatFunction } from './date-time-format-function.type';

export function createDateTimeFormatFunction(
  locales?: ILocalesInput,
  _options?: Intl.DateTimeFormatOptions,
): IDateTimeFormatFunction {
  return (
    value: Date | number,
    options?: Intl.DateTimeFormatOptions,
  ): string => {
    return new Intl.DateTimeFormat(
      locales as any,
      {
        ..._options,
        ...options,
      },
    ).format(value);
  };
}
