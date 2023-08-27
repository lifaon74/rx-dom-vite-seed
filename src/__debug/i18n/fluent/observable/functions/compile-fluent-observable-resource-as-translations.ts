import {
  IIterableOfObservableTranslationsEntry,
} from '../../../intl/translate/observable/types/class/iterable-of-observable-translations-entry.type';
import { compileFluentObservableResource } from '../../compile/compile-fluent-observable-resource';
import {
  convertFluentObservableMessagesMapToObservableTranslationsIterable,
} from './convert-fluent-observable-messages-map-to-observable-translations-iterable';

export function compileFluentObservableResourceAsTranslations(
  input: string,
): IIterableOfObservableTranslationsEntry {
  return convertFluentObservableMessagesMapToObservableTranslationsIterable(compileFluentObservableResource(input));
}
