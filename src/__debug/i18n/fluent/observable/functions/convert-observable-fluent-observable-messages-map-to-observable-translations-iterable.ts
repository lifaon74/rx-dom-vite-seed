import { IObservable, map$$ } from '@lirx/core';
import { IObservableTranslationsIterable } from '../../../intl/translate/observable/types/class/observable-translations-iterable.type';
import { IReadonlyFluentObservableMessagesMap } from '../../built-in/message/observable/map/fluent-observable-messages-map.type';
import {
  convertFluentObservableMessagesMapToObservableTranslationsIterable,
} from './convert-fluent-observable-messages-map-to-observable-translations-iterable';

export function convertObservableFluentObservableMessagesMapToObservableTranslationsIterable(
  fluentMessagesMap$: IObservable<IReadonlyFluentObservableMessagesMap>,
): IObservableTranslationsIterable {
  return map$$(fluentMessagesMap$, convertFluentObservableMessagesMapToObservableTranslationsIterable);
}
