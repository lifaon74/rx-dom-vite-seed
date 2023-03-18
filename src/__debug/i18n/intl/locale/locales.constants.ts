import { $$map, IObservable, IObserver, let$$ } from '@lirx/core';
import { localesInputToLocalesList } from './locales-input-to-locales-list';
import { ILocalesInput } from './locales-input.type';
import { ILocalesList } from './locales-list.type';

const [$locales, locales$, _getLocales] = let$$<ILocalesList>(navigator.languages);

export const LOCALES$: IObservable<ILocalesList> = locales$;
export const $LOCALES: IObserver<ILocalesInput> = $$map($locales, localesInputToLocalesList);
export const getLocales: () => ILocalesList = _getLocales;





