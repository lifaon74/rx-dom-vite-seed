import { IObservable } from '@lirx/core';

export interface IObservableListFormatFunction {
  (
    value$: IObservable<Iterable<string>>,
    options?: Partial<Intl.ListFormatOptions>,
  ): IObservable<string>;
}
