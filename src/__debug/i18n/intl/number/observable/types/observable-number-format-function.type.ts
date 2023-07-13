import { IObservable } from '@lirx/core';

export interface IObservableNumberFormatFunction {
  (
    value$: IObservable<number>,
    options?: Partial<Intl.NumberFormatOptions>,
  ): IObservable<string>;
}
