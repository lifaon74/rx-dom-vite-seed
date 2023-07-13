import { IObservable, map$$, mapDistinct$$, shareRL$$, switchMap$$ } from '@lirx/core';
import { ILocalesList } from '../../locale/locales-list.type';
import { LOCALES$ } from '../../locale/locales.constants';
import { IObservableListFormatFunction } from './types/observable-number-format-function.type';

export class ObservableListFormat {
  readonly #format: IObservableListFormatFunction;

  constructor(
    locales$: IObservable<ILocalesList> = LOCALES$,
    options?: Intl.ListFormatOptions,
  ) {
    this.#format = (
      value$: IObservable<Iterable<string>>,
      _options?: Partial<Intl.ListFormatOptions>,
    ): IObservable<string> => {
      const format$ = map$$(locales$, (locales: ILocalesList): Intl.ListFormat => {
        return new Intl.ListFormat(
          locales as any,
          {
            ...options,
            ..._options,
          },
        );
      });

      return shareRL$$(
        switchMap$$(format$, (format: Intl.ListFormat): IObservable<string> => {
          return mapDistinct$$(value$, (value: Iterable<string>): string => {
            return format.format(value);
          });
        }),
      );
    };
  }

  get format(): IObservableListFormatFunction {
    return this.#format;
  }
}
