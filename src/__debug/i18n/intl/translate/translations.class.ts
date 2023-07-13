import { DEFAULT_TRANSLATE_FUNCTION_FUNCTIONS } from './default-translate-function-functions.constant';
import { ITranslationsOptions } from './types/class/translations-options.type';
import { ITranslationsEntryTranslateFunction } from './types/class/translations-entry-translate-function.type';
import { ITranslationsIterable } from './types/class/translations-iterable.type';
import { IPartialTranslateFunctionFunctions, ITranslateFunctionFunctions } from './types/translate-function-functions.type';
import { ITranslateFunctionVariables } from './types/translate-function-variables.type';
import { ITranslateFunction } from './types/translate-function.type';

export class Translations {
  readonly #translate: ITranslateFunction;

  constructor(
    translations: ITranslationsIterable,
    defaultFunctions?: IPartialTranslateFunctionFunctions,
    {
      missingReturn = 'throw',
    }: ITranslationsOptions = {},
  ) {
    const _translations: Map<string, ITranslationsEntryTranslateFunction> = (translations instanceof Map)
      ? translations
      : new Map<string, ITranslationsEntryTranslateFunction>(translations);

    const _defaultFunctions: ITranslateFunctionFunctions = {
      ...DEFAULT_TRANSLATE_FUNCTION_FUNCTIONS,
      ...defaultFunctions,
    };

    this.#translate = (
      key: string,
      variables: ITranslateFunctionVariables = {},
      functions?: IPartialTranslateFunctionFunctions,
    ): string => {
      if (_translations.has(key)) {
        return _translations.get(key)!(variables, {
          ..._defaultFunctions,
          ...functions,
        } as ITranslateFunctionFunctions);
      } else {
        switch (missingReturn) {
          case 'key':
            return key;
          case 'throw':
            throw new Error(`Missing translation for "${key}"`);
        }
      }
    };
  }

  get translate(): ITranslateFunction {
    return this.#translate;
  }
}


