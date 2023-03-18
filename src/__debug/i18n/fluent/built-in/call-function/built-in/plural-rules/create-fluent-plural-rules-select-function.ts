import { ILocalesInput } from '../../../../../intl/locale/locales-input.type';
import { IFluentPluralRulesSelectFunction } from './fluent-plural-rules-select-function.type';

export function createFluentPluralRulesSelectFunction(
  locales?: ILocalesInput,
  _options?: Intl.PluralRulesOptions,
): IFluentPluralRulesSelectFunction {
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
