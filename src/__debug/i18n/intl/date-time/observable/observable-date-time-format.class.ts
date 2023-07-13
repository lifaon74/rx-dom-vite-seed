import { IObservable, map$$, mapDistinct$$, shareRL$$, switchMap$$ } from '@lirx/core';
import { ILocalesList } from '../../locale/locales-list.type';
import { LOCALES$ } from '../../locale/locales.constants';
import { IObservableDateTimeFormatFunction } from './types/observable-date-time-format-function.type';

export class ObservableDateTimeFormat {
  readonly #format: IObservableDateTimeFormatFunction;

  constructor(
    locales$: IObservable<ILocalesList> = LOCALES$,
    options?: Intl.DateTimeFormatOptions,
  ) {
    this.#format = (
      value$: IObservable<Date | number>,
      _options?: Partial<Intl.DateTimeFormatOptions>,
    ): IObservable<string> => {
      const format$ = map$$(locales$, (locales: ILocalesList): Intl.DateTimeFormat => {
        return new Intl.DateTimeFormat(
          locales as any,
          {
            ...options,
            ..._options,
          },
        );
      });

      return shareRL$$(
        switchMap$$(format$, (format: Intl.DateTimeFormat): IObservable<string> => {
          return mapDistinct$$(value$, (value: Date | number): string => {
            return format.format(value);
          });
        }),
      );
    };
  }

  get format(): IObservableDateTimeFormatFunction {
    return this.#format;
  }
}
