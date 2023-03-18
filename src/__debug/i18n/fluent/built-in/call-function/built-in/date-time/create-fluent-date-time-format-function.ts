import { ILocalesInput } from '../../../../../intl/locale/locales-input.type';
import { IFluentDateTimeFormatFunction } from './fluent-date-time-format-function.type';

export function createFluentDateTimeFormatFunction(
  locales?: ILocalesInput,
  _options?: Intl.DateTimeFormatOptions,
): IFluentDateTimeFormatFunction {
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
