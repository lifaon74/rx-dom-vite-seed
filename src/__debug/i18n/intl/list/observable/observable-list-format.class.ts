import { distinct$$, IObservable, map$$, shareRL$$, switchMap$$ } from '@lirx/core';
import { ILocalesList } from '../../locale/locales-list.type';
import { LOCALES } from '../../locale/locales.constants';
import { IObservableListFormatFunction } from './types/observable-list-format-function.type';

export class ObservableListFormat {
  readonly #format: IObservableListFormatFunction;

  constructor(
    locales$: IObservable<ILocalesList> = LOCALES.observe,
    options?: Intl.ListFormatOptions,
  ) {
    this.#format = (
      list$: IObservable<Iterable<string>>,
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
        distinct$$(
          switchMap$$(format$, (format: Intl.ListFormat): IObservable<string> => {
            return map$$(list$, (values: Iterable<string>): string => {
              return format.format(values);
            });
          }),
        ),
      );
    };
  }

  get format(): IObservableListFormatFunction {
    return this.#format;
  }
}
