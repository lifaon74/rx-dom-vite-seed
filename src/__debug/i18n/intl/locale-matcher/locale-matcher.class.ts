import { ILocaleMatcherPartialMatchFunction } from './types/locale-matcher-partial-match-function.type';
import { getIntlLocaleMatcher } from './native/get-intl-locale-matcher';
import { ILocaleMatcherMatchFunctionOptions } from './native/locale-matcher.type';

export class LocaleMatcher {
  readonly #match: ILocaleMatcherPartialMatchFunction;

  constructor(
    availableLocales: readonly string[],
    defaultLocale: string = availableLocales[0],
    options?: ILocaleMatcherMatchFunctionOptions,
  ) {
    this.#match = (
      _requestedLocales: readonly string[] = navigator.languages,
      _availableLocales: readonly string[] = availableLocales,
      _defaultLocale: string = defaultLocale,
      _options: ILocaleMatcherMatchFunctionOptions | undefined = options,
    ): string => {
      return getIntlLocaleMatcher().match(
        _requestedLocales,
        _availableLocales,
        _defaultLocale,
        _options,
      );
    };
  }

  get match(): ILocaleMatcherPartialMatchFunction {
    return this.#match;
  }
}
