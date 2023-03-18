import { IObservable, map$$ } from '@lirx/core';
import { ILocalesList } from '../locale/locales-list.type';
import { LOCALES$ } from '../locale/locales.constants';
import { getIntlLocaleMatcher } from './get-intl-locale-matcher';
import { ILocaleMatcherMatchFunctionOptions } from './locale-matcher.type';

export interface ILocaleMatcherObservableOptions extends ILocaleMatcherMatchFunctionOptions {
  locales$: IObservable<ILocalesList>;
  availableLocales: readonly string[];
  defaultLocale?: string;
}

export function localeMatcherObservable(
  {
    locales$,
    availableLocales,
    defaultLocale = availableLocales[0],
    ...options
  }: ILocaleMatcherObservableOptions,
): IObservable<string> {
  return map$$(locales$, (locales: ILocalesList): string => {
    return getIntlLocaleMatcher().match(
      locales,
      availableLocales as string[],
      defaultLocale,
      options,
    );
  });
}
