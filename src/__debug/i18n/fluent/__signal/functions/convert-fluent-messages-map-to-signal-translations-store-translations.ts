import {
  ISignalTranslationsStoreTranslationEntry,
  ISignalTranslationsStoreTranslations,
} from '../../../intl/translate/__signal/types/signal-translations-store-translations.type';
import { IFluentMessageFunction } from '../../built-in/message/fluent-message-function.type';
import { IReadonlyFluentMessagesMap } from '../../built-in/message/map/fluent-messages-map.type';
import { convertFluentMessageFunctionToSignalTranslateFunction } from './convert-fluent-message-function-to-signal-translate-function';

export function convertFluentMessagesMapToSignalTranslationsStoreTranslations(
  fluentMessagesMap: IReadonlyFluentMessagesMap,
): ISignalTranslationsStoreTranslations {
  return Array.from(
    fluentMessagesMap.entries(),
    ([key, fluentMessageFunction]: [string, IFluentMessageFunction]): ISignalTranslationsStoreTranslationEntry => {
      return [
        key,
        convertFluentMessageFunctionToSignalTranslateFunction(fluentMessageFunction),
      ];
    },
  );
}

