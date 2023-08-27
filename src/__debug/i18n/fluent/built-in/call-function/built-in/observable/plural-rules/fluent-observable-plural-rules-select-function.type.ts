import { IObservable, IObservableLike } from '@lirx/core';

export interface IFluentObservablePluralRulesSelectFunction {
  (
    value: IObservableLike<number>,
    options?: Partial<Intl.PluralRulesOptions>,
  ): IObservable<Intl.LDMLPluralRule>;
}
