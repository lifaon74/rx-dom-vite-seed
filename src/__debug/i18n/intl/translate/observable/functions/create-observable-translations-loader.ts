import { fromPromiseFactory, IObservable, merge, notificationsToLastValue$$, reference, switchMap$$ } from '@lirx/core';
import { ILocaleMatcherMatchFunctionOptions } from '../../../locale-matcher/native/locale-matcher.type';
import { ObservableLocalMatcher } from '../../../locale-matcher/observable/observable-locale-matcher-format.class';
import { ObservableTranslations } from '../observable-translations.class';
import { IIterableOfObservableTranslationsEntry } from '../types/class/iterable-of-observable-translations-entry.type';
import { IPartialObservableTranslateFunctionFunctions } from '../types/observable-translate-function-functions.type';

export interface IIterableOfObservableTranslationsEntryModule {
  default: IIterableOfObservableTranslationsEntry;
}

export interface ILoadTranslationsFromFromLocale {
  (
    locale: string,
    signal: AbortSignal,
  ): Promise<IIterableOfObservableTranslationsEntryModule>;
}

export interface ICreateObservableTranslationsLoaderOptions extends ILocaleMatcherMatchFunctionOptions {
  load: ILoadTranslationsFromFromLocale;
  availableLocales: readonly string[],
  locales$?: IObservable<readonly string[]>,
  defaultLocale?: string,
}

export function createObservableTranslationsLoader(
  {
    load,
    availableLocales,
    locales$,
    defaultLocale,
    ...options
  }: ICreateObservableTranslationsLoaderOptions,
  defaultFunctions?: IPartialObservableTranslateFunctionFunctions,
): ObservableTranslations {
  const locale$ = new ObservableLocalMatcher(
    availableLocales,
    defaultLocale,
    options,
  ).match(locales$);

  const emptyTranslations$ = reference(() => []);

  const translations$ = switchMap$$(locale$, (locale: string) => {
    return merge([
      emptyTranslations$,
      notificationsToLastValue$$(
        fromPromiseFactory((signal: AbortSignal) => load(locale, signal).then(_ => _.default)),
      ),
    ]);
  });

  return new ObservableTranslations(
    translations$,
    defaultFunctions,
  );
}
