import { ILocalesList } from '../locale/locales-list.type';
import { IPluralRulesSelectFunction } from './types/plural-rules-select-function.type';

export class PluralRules {
  readonly #select: IPluralRulesSelectFunction;

  constructor(
    locales?: ILocalesList,
    options?: Intl.PluralRulesOptions,
  ) {
    this.#select = (
      value: number,
      _options?: Partial<Intl.PluralRulesOptions>,
    ): Intl.LDMLPluralRule => {
      return new Intl.PluralRules(
        locales as any,
        {
          ...options,
          ..._options,
        },
      ).select(value);
    };
  }

  get select(): IPluralRulesSelectFunction {
    return this.#select;
  }
}

