import { IObservable } from '@lirx/core';

export interface IObservablePluralRulesSelectFunction {
  (
    value$: IObservable<number>,
    options?: Partial<Intl.PluralRulesOptions>,
  ): IObservable<Intl.LDMLPluralRule>;
}
