import { computed, IObservable, ISignal, map$$ } from '@lirx/core';
import { SignalTranslationsStore } from '../../../intl/translate/signal/signal-translations-store.class';
import { IReadonlyFluentMessagesMap } from '../../built-in/message/map/fluent-messages-map.type';
import {
  convertFluentMessagesMapToSignalTranslationsStoreTranslations,
} from './convert-fluent-messages-map-to-signal-translations-store-translations';

export function createSignalTranslationsStoreFromSignalFluentMessagesMap(
  fluentMessagesMap: ISignal<IReadonlyFluentMessagesMap>,
): SignalTranslationsStore {
  return new SignalTranslationsStore(
    computed(() => convertFluentMessagesMapToSignalTranslationsStoreTranslations(fluentMessagesMap())),
  );
}
