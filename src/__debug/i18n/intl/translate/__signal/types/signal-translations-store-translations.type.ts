import { ISignalTranslateFunction } from './translate-function/signal-translate-function.type';

export type ISignalTranslationsStoreTranslationEntry = [
  key: string,
  translate: ISignalTranslateFunction,
];

export type ISignalTranslationsStoreTranslations = Iterable<ISignalTranslationsStoreTranslationEntry>;
