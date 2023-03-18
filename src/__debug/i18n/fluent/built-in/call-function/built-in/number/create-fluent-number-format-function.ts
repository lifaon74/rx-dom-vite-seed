import { ILocalesInput } from '../../../../../intl/locale/locales-input.type';
import { IFluentNumberFormatFunction } from './fluent-number-format-function.type';

export function createFluentNumberFormatFunction(
  locales?: ILocalesInput,
  _options?: Intl.NumberFormatOptions,
): IFluentNumberFormatFunction {
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
