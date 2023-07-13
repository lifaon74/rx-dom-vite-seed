import { computed, ISignal } from '@lirx/core';
import { ILocalesList } from '../locale/locales-list.type';
import { LOCALES } from '../locale/locales.constants';
import { getIntlLocaleMatcher } from './get-intl-locale-matcher';
import { ILocaleMatcherMatchFunctionOptions } from './locale-matcher.type';

export interface ILocaleMatcherSignalOptions extends ILocaleMatcherMatchFunctionOptions {
  locales?: ISignal<ILocalesList>;
  availableLocales: readonly string[];
  defaultLocale?: string;
}

export function localeMatcherSignal(
  {
    locales = LOCALES,
    availableLocales,
    defaultLocale = availableLocales[0],
    ...options
  }: ILocaleMatcherSignalOptions,
): ISignal<string> {
  return computed((): string => {
    return getIntlLocaleMatcher().match(
      locales(),
      availableLocales as string[],
      defaultLocale,
      options,
    );
  });
}
