import { fromFetchText, IObservable, map$$$, notificationsToLastValue$$$, pipe$$$, shareRL$$, shareRL$$$, switchMap$$ } from '@lirx/core';
import { ILocaleMatcherMatchFunctionOptions } from '../../intl/locale-matcher/native/locale-matcher.type';
import { ObservableLocalMatcher } from '../../intl/locale-matcher/observable/observable-locale-matcher-format.class';
import { ObservableTranslations } from '../../intl/translate/observable/observable-translations.class';
import {
  IPartialObservableTranslateFunctionFunctions,
} from '../../intl/translate/observable/types/observable-translate-function-functions.type';
import { IReadonlyFluentObservableMessagesMap } from '../built-in/message/map/fluent-observable-messages-map.type';
import { compileFluentObservableResource } from '../compile/compile-fluent-observable-resource';
import {
  convertObservableFluentObservableMessagesMapToObservableTranslationsIterable,
} from './functions/convert-observable-fluent-observable-messages-map-to-observable-translations-iterable';

export interface IGetFluentFileURLFromLocale {
  (
    locale: string,
  ): URL;
}

export interface IFluentLoaderSignalTranslationsStoreOptions extends ILocaleMatcherMatchFunctionOptions {
  getURL: IGetFluentFileURLFromLocale;
  locales$?: IObservable<readonly string[]>,
  availableLocales: readonly string[],
  defaultLocale?: string,
}

export class FluentObservableTranslations extends ObservableTranslations {
  static loader(
    {
      getURL,
      locales$,
      availableLocales,
      defaultLocale,
      ...options
    }: IFluentLoaderSignalTranslationsStoreOptions,
    defaultFunctions?: IPartialObservableTranslateFunctionFunctions,
  ): FluentObservableTranslations {
    const localeMatcher = new ObservableLocalMatcher(
      availableLocales,
      defaultLocale,
      options,
    );

    const locale$ = localeMatcher.match(locales$);

    const pipeFluentContent$$$ = pipe$$$([
      notificationsToLastValue$$$<string>(),
      map$$$<string, IReadonlyFluentObservableMessagesMap>(compileFluentObservableResource),
      shareRL$$$<IReadonlyFluentObservableMessagesMap>(),
    ]);

    const fluentMessagesMap$ = switchMap$$(locale$, (locale: string) => {
      return pipeFluentContent$$$(fromFetchText(getURL(locale).toString()));
    });

    return new FluentObservableTranslations(
      fluentMessagesMap$,
      defaultFunctions,
    );
  }

  constructor(
    fluentMessagesMap$: IObservable<IReadonlyFluentObservableMessagesMap>,
    defaultFunctions?: IPartialObservableTranslateFunctionFunctions,
  ) {
    super(
      convertObservableFluentObservableMessagesMapToObservableTranslationsIterable(fluentMessagesMap$),
      defaultFunctions,
    );
  }
}

