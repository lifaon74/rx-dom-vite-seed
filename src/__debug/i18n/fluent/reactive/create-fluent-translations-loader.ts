import { fromPromiseFactory, IObservable, notificationsToLastValueObservablePipe, pipe$$, shareRL$$$, switchMap$$$ } from '@lirx/core';
import { ILocaleMatcherObservableOptions, localeMatcherObservable } from '../../intl/locale-matcher/locale-matcher-observable';
import { IFluentRenderMessageFunction } from '../built-in/message/render/fluent-render-message-function.type';
import { loadFluentResource } from '../compile/load-fluent-resource';

export interface IGetFluentFileURLFromLocale {
  (
    locale: string,
  ): URL;
}

export interface ICreateFluentTranslationsLoaderOptions extends ILocaleMatcherObservableOptions {
  getURL: IGetFluentFileURLFromLocale;
}

/**
 * Creates an Observable, which, when some locales change, compiles a fluent file containing some translations,
 * and returns the result
 */
export function createFluentTranslationsLoader(
  {
    getURL,
    ...options
  }: ICreateFluentTranslationsLoaderOptions,
): IObservable<IFluentRenderMessageFunction> {
  return pipe$$(localeMatcherObservable(options), [
    switchMap$$$<string, IFluentRenderMessageFunction>((locale: string): IObservable<IFluentRenderMessageFunction> => {
      return pipe$$(
        fromPromiseFactory<IFluentRenderMessageFunction>((): Promise<IFluentRenderMessageFunction> => {
          // return import(`./samples/01/sample-01.${locale}.ts`).then(_ => _.default);
          // return loadFluentResource(new URL(`./${path}.${locale}.ftl`, import.meta.url));
          return loadFluentResource(getURL(locale));
        }),
        [
          notificationsToLastValueObservablePipe<IFluentRenderMessageFunction>(),
        ],
      );
    }),
    shareRL$$$<IFluentRenderMessageFunction>(),
  ]);

  // return switchMap$$<string, IFluentRenderMessageFunction>(
  //   localeMatcherObservable(options),
  //   (locale: string): IObservable<IFluentRenderMessageFunction> => {
  //     return pipe$$(
  //       fromPromiseFactory<IFluentRenderMessageFunction>((): Promise<IFluentRenderMessageFunction> => {
  //         // return import(`./samples/01/sample-01.${locale}.ts`).then(_ => _.default);
  //         // return loadFluentResource(new URL(`./${path}.${locale}.ftl`, import.meta.url));
  //         return loadFluentResource(getURL(locale));
  //       }),
  //       [
  //         notificationsToLastValueObservablePipe<IFluentRenderMessageFunction>(),
  //       ],
  //     );
  //   },
  // );
}
