import { IObservable, IObservableLike } from '@lirx/core';

export interface IFluentObservableNumberFormatFunction {
  (
    value: IObservableLike<number>,
    options?: Partial<Intl.NumberFormatOptions>,
  ): IObservable<string>;
}
