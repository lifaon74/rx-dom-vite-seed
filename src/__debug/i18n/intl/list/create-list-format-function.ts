import { ILocalesList } from '../locale/locales-list.type';
import { IListFormatFunction } from './types/list-format-function.type';

export class ListFormat {
  readonly #format: IListFormatFunction;

  constructor(
    locales?: ILocalesList,
    options?: Intl.ListFormatOptions,
  ) {
    this.#format = (
      value: Iterable<string>,
      _options?: Partial<Intl.ListFormatOptions>,
    ): string => {
      return new Intl.ListFormat(
        locales as any,
        {
          ...options,
          ..._options,
        },
      ).format(value);
    };
  }

  get format(): IListFormatFunction {
    return this.#format;
  }
}
