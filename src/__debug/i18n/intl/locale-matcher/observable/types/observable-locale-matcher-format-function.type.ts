import { IObservable } from '@lirx/core';
import { ILocaleMatcherMatchFunctionOptions } from '../../native/locale-matcher.type';

export interface IObservableLocalMatcherMatchFunction {
  (
    requestedLocales$?: IObservable<readonly string[]>,
    availableLocales?: readonly string[],
    defaultLocale?: string,
    options?: ILocaleMatcherMatchFunctionOptions,
  ): IObservable<string>;
}
