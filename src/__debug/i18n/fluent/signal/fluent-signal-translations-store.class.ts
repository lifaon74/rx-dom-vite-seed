import { Abortable } from '@lirx/async-task';
import { computed, effect, IOnCleanUpFunction, ISignal, IWritableSignal, signal } from '@lirx/core';
import { IUnsubscribe } from '@lirx/utils';
import { localeMatcherSignal } from '../../intl/locale-matcher/locale-matcher-signal';
import { SignalTranslationsStore } from '../../intl/translate/signal/signal-translations-store.class';
import { IPartialSignalTranslateFunctions } from '../../intl/translate/signal/types/translate-function/signal-translate-functions.type';
import { ITranslationsStoreOptions } from '../../intl/translate/translations-store.class';
import { IReadonlyFluentMessagesMap } from '../built-in/message/map/fluent-messages-map.type';
import { loadFluentResource } from '../compile/load-fluent-resource';
import {
  convertFluentMessagesMapToSignalTranslationsStoreTranslations,
} from './functions/convert-fluent-messages-map-to-signal-translations-store-translations';
import { ICreateSignalTranslationsStoreFromFluentLoaderOptions } from './functions/create-signal-translations-store-from-fluent-loader';

export class FluentSignalTranslationsStore extends SignalTranslationsStore {
  constructor(
    fluentMessagesMap: ISignal<IReadonlyFluentMessagesMap>,
    defaultFunctions?: IPartialSignalTranslateFunctions,
    options?: ITranslationsStoreOptions,
  ) {
    super(
      computed(() => convertFluentMessagesMapToSignalTranslationsStoreTranslations(fluentMessagesMap())),
      defaultFunctions,
      options,
    );
  }
}

export class FluentLoaderSignalTranslationsStore extends FluentSignalTranslationsStore {
  readonly #start: () => IUnsubscribe;
  #stop: IUnsubscribe | undefined;

  constructor(
    {
      getURL,
      ...options
    }: ICreateSignalTranslationsStoreFromFluentLoaderOptions,
    defaultFunctions?: IPartialSignalTranslateFunctions,
  ) {
    const locale: ISignal<string> = localeMatcherSignal(options);
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
