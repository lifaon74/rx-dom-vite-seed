import { distinct$$, IObservable, map$$, shareRL$$, switchMap$$ } from '@lirx/core';
import { ILocalesList } from '../../locale/locales-list.type';
import { LOCALES } from '../../locale/locales.constants';
import { IObservableNumberFormatFunction } from './types/observable-number-format-function.type';

export class ObservableNumberFormat {
  readonly #format: IObservableNumberFormatFunction;

  constructor(
    locales$: IObservable<ILocalesList> = LOCALES.observe,
    options?: Intl.NumberFormatOptions,
  ) {
    this.#format = (
      value$: IObservable<number>,
      _options?: Partial<Intl.NumberFormatOptions>,
    ): IObservable<string> => {
      const format$ = map$$(locales$, (locales: ILocalesList): Intl.NumberFormat => {
        return new Intl.NumberFormat(
          locales as any,
          {
            ...options,
            ..._options,
          },
        );
      });

      return shareRL$$(
        distinct$$(
          switchMap$$(format$, (format: Intl.NumberFormat): IObservable<string> => {
            return map$$(value$, (value: number): string => {
              return format.format(value);
            });
          }),
        ),
      );
    };
  }

  get format(): IObservableNumberFormatFunction {
    return this.#format;
  }
}
