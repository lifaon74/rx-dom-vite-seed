import { IObservable, map$$, shareRL$$ } from '@lirx/core';
import { LOCALES$ } from '../../locale/locales.constants';
import { getIntlLocaleMatcher } from '../native/get-intl-locale-matcher';
import { ILocaleMatcherMatchFunctionOptions } from '../native/locale-matcher.type';
import { IObservableLocalMatcherMatchFunction } from './types/observable-locale-matcher-format-function.type';

export class ObservableLocalMatcher {
  readonly #match: IObservableLocalMatcherMatchFunction;

  constructor(
    availableLocales: readonly string[],
    defaultLocale: string = availableLocales[0],
    options?: ILocaleMatcherMatchFunctionOptions,
  ) {
    this.#match = (
      requestedLocales$: IObservable<readonly string[]> = LOCALES$,
      _availableLocales: readonly string[] = availableLocales,
      _defaultLocale: string = defaultLocale,
      _options: ILocaleMatcherMatchFunctionOptions | undefined = options,
    ): IObservable<string> => {
      return shareRL$$(
        map$$(requestedLocales$, (requestedLocales: readonly string[]): string => {
          return getIntlLocaleMatcher().match(
            requestedLocales,
            _availableLocales,
            _defaultLocale,
            _options,
          );
        }),
      );
    };
  }

  get match(): IObservableLocalMatcherMatchFunction {
    return this.#match;
  }
}
