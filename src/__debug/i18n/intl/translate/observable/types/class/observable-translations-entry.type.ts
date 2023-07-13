import { IObservableTranslationsEntryTranslateFunction } from './observable-translations-entry-translate-function.type';

export type IObservableTranslationsEntry = [
  key: string,
  translate: IObservableTranslationsEntryTranslateFunction,
];
