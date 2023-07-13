export interface IPluralRulesSelectFunction {
  (
    value: number,
    options?: Intl.PluralRulesOptions,
  ): Intl.LDMLPluralRule;
}
