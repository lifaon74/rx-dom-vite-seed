import { ILocalesList } from '../locale/locales-list.type';
import { INumberFormatFunction } from './types/number-format-function.type';

export class NumberFormat {
  readonly #format: INumberFormatFunction;

  constructor(
    locales?: ILocalesList,
    options?: Intl.NumberFormatOptions,
  ) {
    this.#format = (
      value: number,
      _options?: Partial<Intl.NumberFormatOptions>,
    ): string => {
      return new Intl.NumberFormat(
        locales as any,
        {
          ...options,
          ..._options,
        },
      ).format(value);
    };
  }

  get format(): INumberFormatFunction {
    return this.#format;
  }
}
