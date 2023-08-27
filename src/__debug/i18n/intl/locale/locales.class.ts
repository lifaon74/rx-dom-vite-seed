import { ILocalesList } from './locales-list.type';
import { IObserver, IObservable, createMulticastReplayLastSource, $$map } from '@lirx/core';
import { ILocalesInput } from './locales-input.type';
import { localesInputToLocalesList } from './locales-input-to-locales-list';

export interface IGetLocalesListFunction {
  (): ILocalesList;
}

export class Locales {
  readonly #get: IGetLocalesListFunction;
  readonly #set: IObserver<ILocalesInput>;
  readonly #observe: IObservable<ILocalesList>;

  constructor(
    locales: ILocalesList = navigator.languages,
  ) {
    const {
      emit,
      subscribe,
      getValue,
    } = createMulticastReplayLastSource<ILocalesList>(locales);

    this.#get = getValue;
    this.#set = $$map(emit, localesInputToLocalesList);
    this.#observe = subscribe;

  }

  get get(): IGetLocalesListFunction {
    return this.#get;
  }

  get set(): IObserver<ILocalesInput> {
    return this.#set;
  }

  get observe(): IObservable<ILocalesList> {
    return this.#observe;
  }
}
