import { computed, ISignal } from '@lirx/core';
import { SignalTranslationsStore } from '../../intl/translate/signal/signal-translations-store.class';
import { IPartialSignalTranslateFunctions } from '../../intl/translate/signal/types/translate-function/signal-translate-functions.type';
import { ITranslationsOptions } from '../../intl/translate/types/class/translations-options.type';
import { IReadonlyFluentMessagesMap } from '../built-in/message/map/fluent-messages-map.type';
import {
  convertFluentMessagesMapToSignalTranslationsStoreTranslations,
} from './functions/convert-fluent-messages-map-to-signal-translations-store-translations';

export class FluentSignalTranslationsStore extends SignalTranslationsStore {
  constructor(
    fluentMessagesMap: ISignal<IReadonlyFluentMessagesMap>,
    defaultFunctions?: IPartialSignalTranslateFunctions,
    options?: ITranslationsOptions,
  ) {
    super(
      computed(() => convertFluentMessagesMapToSignalTranslationsStoreTranslations(fluentMessagesMap())),
      defaultFunctions,
      options,
    );
  }
}

