import { computed, function$$, ISignal, isSignal, map$$, signal, single, switchMap$$, untracked } from '@lirx/core';
import { DEFAULT_TRANSLATIONS_STORE_FUNCTIONS } from '../default-translations-store-functions.constant';
import { ITranslationsStoreMissingKeyReturn, ITranslationsStoreOptions } from '../translations-store.class';
import { IPartialTranslateFunctions, ITranslateFunctions } from '../types/translate-function/translate-functions.type';
import {
  convertObjectOfObservableLikesToSignalTranslateVariables,
  ITranslateVariablesAsObjectOfObservableLikes,
} from './functions/convert-object-of-observable-likes-to-signal-translate-variables';
import { ISignalTranslationsStoreTranslations } from './types/signal-translations-store-translations.type';
import { ISignalTranslateFunction } from './types/translate-function/signal-translate-function.type';
import {
  IPartialSignalTranslateFunctions,
  ISignalTranslateFunctions,
} from './types/translate-function/signal-translate-functions.type';
import { ISignalTranslateVariables } from './types/translate-function/signal-translate-variables.type';

type ISignalTranslationsStoreMap = ReadonlyMap<string, ISignalTranslateFunction>;

export class SignalTranslationsStore {
  readonly #translations: ISignal<ISignalTranslationsStoreMap>;
  readonly #defaultFunctions: ISignalTranslateFunctions;
  readonly #missingReturn: ITranslationsStoreMissingKeyReturn;

  constructor(
    translations: ISignal<ISignalTranslationsStoreTranslations>,
    defaultFunctions: IPartialSignalTranslateFunctions = signal({}),
    {
      missingReturn = 'throw',
    }: ITranslationsStoreOptions = {},
  ) {
    this.#translations = computed((): ISignalTranslationsStoreMap => {
      return (translations() instanceof Map)
        ? translations() as ISignalTranslationsStoreMap
        : new Map<string, ISignalTranslateFunction>(translations());
    });

    this.#defaultFunctions = computed((): ITranslateFunctions => {
      return {
        ...DEFAULT_TRANSLATIONS_STORE_FUNCTIONS,
        ...defaultFunctions(),
      };
    });

    this.#missingReturn = missingReturn;
  }

  translate(
    key: string,
    variables?: ISignalTranslateVariables | ITranslateVariablesAsObjectOfObservableLikes,
    functions?: IPartialSignalTranslateFunctions,
  ): ISignal<string> {
    const _variables: ISignalTranslateVariables = (variables === void 0)
      ? signal({})
      : (
        isSignal(variables)
          ? variables
          : convertObjectOfObservableLikesToSignalTranslateVariables(variables)
      );

    const _functions: ISignalTranslateFunctions = (functions === void 0)
      ? this.#defaultFunctions
      : computed((): ITranslateFunctions => {
        return {
          ...this.#defaultFunctions(),
          ...functions(),
        } as ITranslateFunctions;
      });

    const translateFunction = computed((): ISignalTranslateFunction => {
      if (this.#translations().has(key)) {
        return this.#translations().get(key)!;
      } else {
        switch (this.#missingReturn) {
          case 'key':
            return () => signal(key);
          case 'throw':
            throw new Error(`Missing translation for "${key}"`);
        }
      }
    });


    const outSignal = computed((): ISignal<string> => {
      const _translateFunction: ISignalTranslateFunction = translateFunction();
      return untracked(() => _translateFunction(_variables, _functions));
    });

    return computed(() => {
      return outSignal()();
    });
  }
}



