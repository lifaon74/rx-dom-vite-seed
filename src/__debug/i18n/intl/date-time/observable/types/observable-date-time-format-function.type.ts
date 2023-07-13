import { IObservable } from '@lirx/core';

export interface IObservableDateTimeFormatFunction {
  (
    value$: IObservable<Date | number>,
    options?: Partial<Intl.DateTimeFormatOptions>,
  ): IObservable<string>;
}
