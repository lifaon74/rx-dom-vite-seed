import { computed, ISignal, IWritableSignal, signal } from '@lirx/core';
import { localesInputToLocalesList } from './locales-input-to-locales-list';
import { ILocalesInput } from './locales-input.type';
import { ILocalesList } from './locales-list.type';

export const LOCALE: IWritableSignal<ILocalesInput> = signal(navigator.languages);
export const LOCALES: ISignal<ILocalesList> = computed(() => localesInputToLocalesList(LOCALE()));





