import { ITranslateFunction } from './translate-function/translate-function.type';

export type ITranslationsStoreTranslationEntry = [
  key: string,
  translate: ITranslateFunction,
];

export type ITranslationsStoreTranslations = Iterable<ITranslationsStoreTranslationEntry>;
