export interface IFluentPluralRulesSelectFunction {
  (
    value: number,
    options?: Intl.PluralRulesOptions,
  ): Intl.LDMLPluralRule;
}
