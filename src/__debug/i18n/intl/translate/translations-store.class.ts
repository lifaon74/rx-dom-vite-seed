import { DEFAULT_TRANSLATIONS_STORE_FUNCTIONS } from './default-translations-store-functions.constant';
import { ITranslateFunction } from './types/translate-function/translate-function.type';
import { IPartialTranslateFunctions, ITranslateFunctions } from './types/translate-function/translate-functions.type';
import { ITranslateVariables } from './types/translate-function/translate-variables.type';
import { ITranslationsStoreTranslations } from './types/translations-store-translations.type';

export type ITranslationsStoreMissingKeyReturn =
  | 'key'
  | 'throw'
  ;

export interface ITranslationsStoreOptions {
  missingReturn?: ITranslationsStoreMissingKeyReturn;
}

export class TranslationsStore {
  readonly #translations: ReadonlyMap<string, ITranslateFunction>;
  readonly #defaultFunctions: ITranslateFunctions;
  readonly #missingReturn: ITranslationsStoreMissingKeyReturn;

  constructor(
    translations: ITranslationsStoreTranslations,
    defaultFunctions?: IPartialTranslateFunctions,
    {
      missingReturn = 'throw',
    }: ITranslationsStoreOptions = {},
  ) {
    this.#translations = (translations instanceof Map)
      ? translations
      : new Map<string, ITranslateFunction>(translations);
    this.#defaultFunctions = {
      ...DEFAULT_TRANSLATIONS_STORE_FUNCTIONS,
      ...defaultFunctions,
    };
    this.#missingReturn = missingReturn;
  }

  translate(
    key: string,
    variables: ITranslateVariables = {},
    functions?: IPartialTranslateFunctions,
  ): string {
    if (this.#translations.has(key)) {
      return this.#translations.get(key)!(variables, {
        ...this.#defaultFunctions,
        ...functions,
      } as ITranslateFunctions);
    } else {
      switch (this.#missingReturn) {
        case 'key':
          return key;
        case 'throw':
          throw new Error(`Missing translation for "${key}"`);
      }
    }
  }
}



