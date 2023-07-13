export interface IPluralRulesSelectFunction {
  (
    value: number,
    options?: Partial<Intl.PluralRulesOptions>,
  ): Intl.LDMLPluralRule;
}
