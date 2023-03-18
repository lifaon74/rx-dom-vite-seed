import { IPluralRulesFormatFunction } from './plural-rules-format-function.type';

export function createPluralRulesFormatFunctionFromPluralRules(
  pluralRules: Intl.PluralRules,
): IPluralRulesFormatFunction {
  return (
    value: number,
  ): Intl.LDMLPluralRule => {
    return pluralRules.select(value);
  };
}
