import { IObservable, map$$ } from '@lirx/core';
import { IObservableTranslationsEntry } from '../../../intl/translate/observable/types/class/observable-translations-entry.type';
import { IReadonlyFluentObservableMessagesMap } from '../../built-in/message/map/fluent-observable-messages-map.type';
import {
  convertFluentObservableMessagesMapToObservableTranslationsIterable,
} from './convert-fluent-observable-messages-map-to-observable-translations-iterable';

export function convertObservableFluentObservableMessagesMapToObservableTranslationsIterable(
  fluentMessagesMap$: IObservable<IReadonlyFluentObservableMessagesMap>,
): IObservable<Iterable<IObservableTranslationsEntry>> {
  return map$$(fluentMessagesMap$, convertFluentObservableMessagesMapToObservableTranslationsIterable);
}
