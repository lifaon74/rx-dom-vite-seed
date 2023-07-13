import { IObservable, map$$, mapDistinct$$, shareRL$$, switchMap$$ } from '@lirx/core';
import { ILocalesList } from '../../locale/locales-list.type';
import { LOCALES$ } from '../../locale/locales.constants';
import { IObservablePluralRulesSelectFunction } from './types/observable-plural-rules-select-function.type';

export class ObservablePluralRules {
  readonly #select: IObservablePluralRulesSelectFunction;

  constructor(
    locales$: IObservable<ILocalesList> = LOCALES$,
    options?: Intl.PluralRulesOptions,
  ) {
    this.#select = (
      value$: IObservable<number>,
      _options?: Partial<Intl.PluralRulesOptions>,
    ): IObservable<Intl.LDMLPluralRule> => {
      const pluralRules$ = map$$(locales$, (locales: ILocalesList): Intl.PluralRules => {
        return new Intl.PluralRules(
          locales as any,
          {
            ...options,
            ..._options,
          },
        );
      });

      return shareRL$$(
        switchMap$$(pluralRules$, (pluralRules: Intl.PluralRules): IObservable<Intl.LDMLPluralRule> => {
          return mapDistinct$$(value$, (value: number): Intl.LDMLPluralRule => {
            return pluralRules.select(value);
          });
        }),
      );
    };
  }

  get select(): IObservablePluralRulesSelectFunction {
    return this.#select;
  }
}
