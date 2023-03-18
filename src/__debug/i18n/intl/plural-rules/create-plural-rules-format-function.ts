import { ILocalesInput } from '../locale/locales-input.type';
import { IPluralRulesFormatFunction } from './plural-rules-format-function.type';
import { createPluralRulesFormatFunctionFromPluralRules } from './create-plural-rules-format-function-from-plural-rules';

export function createPluralRulesFormatFunction(
  locales?: ILocalesInput,
  options?: Intl.PluralRulesOptions,
): IPluralRulesFormatFunction {
  return createPluralRulesFormatFunctionFromPluralRules(
    new Intl.PluralRules(
      locales as any,
      options,
    ),
  );
}
