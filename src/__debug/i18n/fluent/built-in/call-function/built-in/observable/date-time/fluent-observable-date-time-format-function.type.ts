import { IObservable, IObservableLike } from '@lirx/core';

export interface IFluentObservableDateTimeFormatFunction {
  (
    value: IObservableLike<Date | number>,
    options?: Partial<Intl.DateTimeFormatOptions>,
  ): IObservable<string>;
}
