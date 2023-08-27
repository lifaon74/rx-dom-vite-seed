import {
  IIterableOfObservableTranslationsEntry
} from '../../../intl/translate/observable/types/class/iterable-of-observable-translations-entry.type';
import { IObservableTranslationsEntry } from '../../../intl/translate/observable/types/class/observable-translations-entry.type';
import { IFluentObservableMessageFunction } from '../../built-in/message/observable/fluent-observable-message-function.type';
import { IReadonlyFluentObservableMessagesMap } from '../../built-in/message/observable/map/fluent-observable-messages-map.type';
import {
  convertFluentObservableMessageFunctionToObservableTranslationsEntryTranslateFunction,
} from './convert-fluent-observable-message-function-to-observable-translations-entry-translate-function';

export function convertFluentObservableMessagesMapToObservableTranslationsIterable(
  fluentMessagesMap: IReadonlyFluentObservableMessagesMap,
): IIterableOfObservableTranslationsEntry {
  return Array.from(
    fluentMessagesMap.entries(),
    ([key, fluentMessageFunction]: [string, IFluentObservableMessageFunction]): IObservableTranslationsEntry => {
      return [
        key,
        convertFluentObservableMessageFunctionToObservableTranslationsEntryTranslateFunction(fluentMessageFunction),
      ];
    },
  );
}



