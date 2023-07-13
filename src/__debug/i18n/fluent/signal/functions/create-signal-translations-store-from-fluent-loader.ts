import { Abortable } from '@lirx/async-task';
import { effect, IOnCleanUpFunction, ISignal, IWritableSignal, signal } from '@lirx/core';
import { IUnsubscribe } from '@lirx/utils';
import { ILocaleMatcherSignalOptions, localeMatcherSignal } from '../../../intl/locale-matcher/locale-matcher-signal';
import { SignalTranslationsStore } from '../../../intl/translate/signal/signal-translations-store.class';
import { IReadonlyFluentMessagesMap } from '../../built-in/message/map/fluent-messages-map.type';
import { loadFluentResource } from '../../compile/load-fluent-resource';
import {
  createSignalTranslationsStoreFromSignalFluentMessagesMap
} from './create-signal-translations-store-from-signal-fluent-messages-map';

export interface IGetFluentFileURLFromLocale {
  (
    locale: string,
  ): URL;
}

export interface ICreateSignalTranslationsStoreFromFluentLoaderOptions extends ILocaleMatcherSignalOptions {
  getURL: IGetFluentFileURLFromLocale;
}

export type ICreateSignalTranslationsStoreFromFluentLoaderResult = [
  store: SignalTranslationsStore,
  stop: IUnsubscribe,
]

/**
 * Creates a Signal, which, when some locales change, compiles a fluent file containing some translations,
 * and returns the result
 */
export function createSignalTranslationsStoreFromFluentLoader(
  {
    getURL,
    ...options
  }: ICreateSignalTranslationsStoreFromFluentLoaderOptions,
): ICreateSignalTranslationsStoreFromFluentLoaderResult {
  const locale: ISignal<string> = localeMatcherSignal(options);
  const fluentMessagesMap: IWritableSignal<IReadonlyFluentMessagesMap> = signal(new Map());

  return [
    createSignalTranslationsStoreFromSignalFluentMessagesMap(fluentMessagesMap),
    effect((onCleanUp: IOnCleanUpFunction): void => {
      const [abort, abortable] = Abortable.derive();
      onCleanUp(abort);

      loadFluentResource(getURL(locale()), abortable)
        .successful((_fluentMessagesMap: IReadonlyFluentMessagesMap): void => {
          fluentMessagesMap.set(_fluentMessagesMap);
        });
    }),
  ];
}
