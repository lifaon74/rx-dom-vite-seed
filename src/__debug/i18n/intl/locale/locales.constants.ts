import { computed, ISignal, IWritableSignal, signal } from '@lirx/core';
import { localesInputToLocalesList } from './locales-input-to-locales-list';
import { ILocalesInput } from './locales-input.type';
import { ILocalesList } from './locales-list.type';

export const LOCALES: IWritableSignal<ILocalesList> = signal(navigator.languages);
export const LOCALE: ISignal<ILocalesInput> = computed(() => localesInputToLocalesList(LOCALES()));





