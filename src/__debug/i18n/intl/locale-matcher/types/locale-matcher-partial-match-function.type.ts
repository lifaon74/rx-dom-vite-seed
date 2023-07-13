import { ILocaleMatcherMatchFunctionOptions } from '../native/locale-matcher.type';

export interface ILocaleMatcherPartialMatchFunction {
  (
    requestedLocales?: readonly string[],
    availableLocales?: readonly string[],
    defaultLocale?: string,
    options?: ILocaleMatcherMatchFunctionOptions,
  ): string;
}
