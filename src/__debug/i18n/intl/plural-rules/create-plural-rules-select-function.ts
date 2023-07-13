import { ILocalesInput } from '../locale/locales-input.type';
import { IPluralRulesSelectFunction } from './plural-rules-select-function.type';

export function createPluralRulesSelectFunction(
  locales?: ILocalesInput,
  _options?: Intl.PluralRulesOptions,
): IPluralRulesSelectFunction {
  return (
    value: number,
    options?: Intl.PluralRulesOptions,
  ): Intl.LDMLPluralRule => {
    return new Intl.PluralRules(
      locales as any,
      {
        ..._options,
        ...options,
      },
    ).select(value);
  };
}
