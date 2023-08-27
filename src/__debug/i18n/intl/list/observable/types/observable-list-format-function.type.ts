import { IObservable } from '@lirx/core';

export interface IObservableListFormatFunction {
  (
    list$: IObservable<Iterable<string>>,
    options?: Partial<Intl.ListFormatOptions>,
  ): IObservable<string>;
}
