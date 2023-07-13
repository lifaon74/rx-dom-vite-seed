import { IObservable, IObservableLike, map$$, single, switchMap$$, toObservable, toObservableThrowIfUndefined } from '@lirx/core';
import { ITranslateFunctionVariableType } from '../types/translate-function-variables.type';
import { DEFAULT_OBSERVABLE_TRANSLATE_FUNCTION_FUNCTIONS } from './default-observable-translate-function-functions.constant';
import { IObservableTranslationsEntryTranslateFunction } from './types/class/observable-translations-entry-translate-function.type';
import { IObservableTranslationsEntry } from './types/class/observable-translations-entry.type';
import { IObservableTranslationsIterable } from './types/class/observable-translations-iterable.type';
import {
  IObservableTranslateFunctionFunctions,
  IPartialObservableTranslateFunctionFunctions,
} from './types/observable-translate-function-functions.type';
import {
  IObservableTranslateFunctionVariables,
  IObservableTranslateFunctionVariablesLike,
} from './types/observable-translate-function-variables.type';
import { IObservableTranslateFunction, IObservableTranslateFunctionLike } from './types/observable-transtale-function.type';

export class ObservableTranslations {
  readonly #translate: IObservableTranslateFunctionLike;

  constructor(
    translations$: IObservableTranslationsIterable,
    defaultFunctions?: IPartialObservableTranslateFunctionFunctions,
  ) {
    type ITranslationsMap = Map<string, IObservableTranslationsEntryTranslateFunction>;

    const _translations$ = map$$(translations$, (translations: Iterable<IObservableTranslationsEntry>): ITranslationsMap => {
      return (translations instanceof Map)
        ? translations
        : new Map<string, IObservableTranslationsEntryTranslateFunction>(translations);
    });

    const _defaultFunctions: IObservableTranslateFunctionFunctions = {
      ...DEFAULT_OBSERVABLE_TRANSLATE_FUNCTION_FUNCTIONS,
      ...defaultFunctions,
    };

    this.#translate = (
      key: string,
      variables: IObservableTranslateFunctionVariablesLike = {},
      functions?: IPartialObservableTranslateFunctionFunctions,
    ): IObservable<string> => {

      const _variables: any = Object.fromEntries(
        Object.entries(variables).map(([key, value]: [string, IObservableLike<ITranslateFunctionVariableType>]): [string, IObservable<ITranslateFunctionVariableType>] => {
          return [
            key,
            toObservable(value),
          ];
        }),
      );

      const _functions: IObservableTranslateFunctionFunctions = {
        ..._defaultFunctions,
        ...functions,
      } as IObservableTranslateFunctionFunctions;

      return switchMap$$(_translations$, (translations: ITranslationsMap): IObservable<string> => {
        if (translations.has(key)) {
          return translations.get(key)!(
            _variables,
            _functions,
          );
        } else {
          return single(key);
        }
      });
    };
  }

  get translate(): IObservableTranslateFunctionLike {
    return this.#translate;
  }
}


