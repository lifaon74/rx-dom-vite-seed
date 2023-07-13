import { ILocalesInput } from '../locale/locales-input.type';
import { IListFormatFunction } from './list-format-function.type';

export function createListFormatFunction(
  locales?: ILocalesInput,
  _options?: Intl.ListFormatOptions,
): IListFormatFunction {
  return (
    value: Iterable<string>,
    options?: Intl.ListFormatOptions,
  ): string => {
    return new Intl.ListFormat(
      locales as any,
      {
        ..._options,
        ...options,
      },
    ).format(value);
  };
}
