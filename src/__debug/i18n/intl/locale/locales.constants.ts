import { $$map, createMulticastReplayLastSource, IObservable, IObserver } from '@lirx/core';
import { localesInputToLocalesList } from './locales-input-to-locales-list';
import { ILocalesInput } from './locales-input.type';
import { ILocalesList } from './locales-list.type';

const {
  emit,
  subscribe,
  getValue,
} = createMulticastReplayLastSource<ILocalesList>(navigator.languages);

export const $LOCALES: IObserver<ILocalesInput> = $$map(emit, localesInputToLocalesList);
export const LOCALES$: IObservable<ILocalesList> = subscribe;
export const getLocale: () => ILocalesList = getValue;



