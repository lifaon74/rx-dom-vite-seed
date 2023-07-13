import { ITranslationsEntryTranslateFunction } from './translations-entry-translate-function.type';

export type ITranslationsEntry = [
  key: string,
  translate: ITranslationsEntryTranslateFunction,
];
