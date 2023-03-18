import { ILocalesInput } from './locales-input.type';
import { ILocalesList } from './locales-list.type';

export function localesInputToLocalesList(
  locales: ILocalesInput,
): ILocalesList {
  return (typeof locales === 'string')
    ? [locales]
    : locales;
}
