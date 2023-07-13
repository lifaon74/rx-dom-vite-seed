import { ILocalesList } from '../locale/locales-list.type';
import { IDateTimeFormatFunction } from './types/date-time-format-function.type';

export class DateTimeFormat {
  readonly #format: IDateTimeFormatFunction;

  constructor(
    locales?: ILocalesList,
    options?: Intl.DateTimeFormatOptions,
  ) {
    this.#format = (
      value: Date | number,
      _options?: Partial<Intl.DateTimeFormatOptions>,
    ): string => {
      return new Intl.DateTimeFormat(
        locales as any,
        {
          ...options,
          ..._options,
        },
      ).format(value);
    };
  }

  get format(): IDateTimeFormatFunction {
    return this.#format;
  }
}
