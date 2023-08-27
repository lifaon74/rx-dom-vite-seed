import { Abortable } from '@lirx/async-task';
import { effect, IOnCleanUpFunction, ISignal, IWritableSignal, signal } from '@lirx/core';
import { IUnsubscribe } from '@lirx/utils';
import { ILocaleMatcherObservableOptions, localeMatcherObservable } from '../../intl/locale-matcher/locale-matcher-observable';
import { IPartialSignalTranslateFunctions } from '../../intl/translate/__signal/types/translate-function/signal-translate-functions.type';
import { IReadonlyFluentMessagesMap } from '../built-in/message/map/fluent-messages-map.type';
import { loadFluentResource } from '../compile/load-fluent-resource';
import { FluentSignalTranslationsStore } from './fluent-signal-translations-store.class';

export interface IGetFluentFileURLFromLocale {
  (
    locale: string,
  ): URL;
}

export interface IFluentLoaderSignalTranslationsStoreOptions extends ILocaleMatcherObservableOptions {
  getURL: IGetFluentFileURLFromLocale;
}

export class FluentLoaderSignalTranslationsStore extends FluentSignalTranslationsStore {
  readonly #start: () => IUnsubscribe;
  #stop: IUnsubscribe | undefined;

  constructor(
    {
      getURL,
      ...options
    }: IFluentLoaderSignalTranslationsStoreOptions,
    defaultFunctions?: IPartialSignalTranslateFunctions,
  ) {
    const locale: ISignal<string> = localeMatcherObservable(options);
    const fluentMessagesMap: IWritableSignal<IReadonlyFluentMessagesMap> = signal(new Map());

    super(
      fluentMessagesMap,
      defaultFunctions,
      {
        missingReturn: 'key',
      },
    );

    this.#start = (): IUnsubscribe => {
      return effect((onCleanUp: IOnCleanUpFunction): void => {
        const [abort, abortable] = Abortable.derive();
        onCleanUp(abort);

        loadFluentResource(getURL(locale()), abortable)
          .successful((_fluentMessagesMap: IReadonlyFluentMessagesMap): void => {
            fluentMessagesMap.set(_fluentMessagesMap);
          });
      });
    };
  }

  get active(): boolean {
    return this.#stop !== void 0;
  }

  start(): this {
    if (this.#stop === void 0) {
      this.#stop = this.#start();
    }
    return this;
  }

  stop(): this {
    if (this.#stop !== void 0) {
      this.#stop();
      this.#stop = void 0;
    }
    return this;
  }
}
