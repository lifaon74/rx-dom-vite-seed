import { $log, signal } from '@lirx/core';
import { createDateTimeFormatFunction } from '../../intl/date-time/create-date-time-format-function';
import { LOCALES } from '../../intl/locale/locales.constants';
import { createNumberFormatFunction } from '../../intl/number/create-number-format-function';
import { TranslationsStore } from '../../intl/translate/translations-store.class';
import { ITranslateFunctions } from '../../intl/translate/types/translate-function/translate-functions.type';
import { ITranslateVariables } from '../../intl/translate/types/translate-function/translate-variables.type';
import {
  ITranslationsStoreTranslationEntry,
  ITranslationsStoreTranslations,
} from '../../intl/translate/types/translations-store-translations.type';
import {
  convertListFormatFunctionToFluentListFormat,
} from '../built-in/call-function/built-in/list/convert-list-format-function-to-fluent-list-format';
import { createFluentMessageOptions } from '../built-in/message/create-fluent-message-options';
import { FluentLoaderSignalTranslationsStore } from '../signal/fluent-signal-translations-store.class';

import {
  createSignalTranslationsStoreFromSignalFluentMessagesMap,
} from '../signal/functions/create-signal-translations-store-from-signal-fluent-messages-map';
import {
  convertObjectOfObservableLikesToSignalTranslateVariables,
} from '../../intl/translate/signal/functions/convert-object-of-observable-likes-to-signal-translate-variables';

import messages from './samples/01/sample-01.en';

/*----*/

function debugFluentStore1(): void {
  const store: TranslationsStore = new TranslationsStore([
    ['abc', ({ name }) => `Hello ${name}`],
  ]);

  const str = store.translate('abc', {
    name: 'Alice',
  }, {
    numberFormat: createNumberFormatFunction(),
    dateTimeFormat: createDateTimeFormatFunction(),
    abc: createDateTimeFormatFunction(),
  });

  console.log(str);
}

function debugFluentStore2(): void {

  const translations: ITranslationsStoreTranslations = Array.from(messages.entries(), ([key, fluentMessageFunction]): ITranslationsStoreTranslationEntry => {
    return [
      key,
      (
        variables: ITranslateVariables,
        functions: ITranslateFunctions,
      ): string => {
        const {
          numberFormat,
          dateTimeFormat,
          listFormat,
          pluralRulesSelect,
          ..._functions
        } = functions;

        return fluentMessageFunction(
          createFluentMessageOptions({
            fluentNumberFormat: numberFormat,
            fluentDateTimeFormat: dateTimeFormat,
            fluentPluralRulesSelect: pluralRulesSelect,
            fluentListFormat: convertListFormatFunctionToFluentListFormat(listFormat),
            variables: Object.entries(variables),
            functions: Object.entries(_functions),
          }),
        );
      },
    ];
  });

  const store: TranslationsStore = new TranslationsStore(translations);

  const str = store.translate('shared-photos', {
    userName: 'Alice',
    photoCount: 5,
    userGender: 'female',
  });

  console.log(str);
}

function debugFluentStore3(): void {
  const store = createSignalTranslationsStoreFromSignalFluentMessagesMap(signal(messages));

  const userName = signal('Alice');
  const photoCount = signal(0);
  const userGender = signal('female');

  const variables$ = convertObjectOfObservableLikesToSignalTranslateVariables({
    userName,
    photoCount,
    userGender,
  });

  const translated = store.translate('shared-photos', variables$);

  // translated.toObservable()($log);

  console.log(translated());
  userName.set('Bob');
  console.log(translated());
  userGender.set('male');
  console.log(translated());
}


function debugFluentStore4(): void {
  const store = new FluentLoaderSignalTranslationsStore({
    availableLocales: ['en', 'fr'],
    getURL: (locale: string) => new URL(`./samples/01/sample-01.${locale}.ftl`, import.meta.url),
  }).start();

  const userName = signal('Alice');
  const photoCount = signal(0);
  const userGender = signal('female');
  const duration = signal(4.2);

  const sharedPhotoTranslation = store.translate('shared-photos', {
    userName,
    photoCount,
    userGender,
  });

  const timeElapsedTranslation = store.translate('time-elapsed', {
    duration,
  });

  sharedPhotoTranslation.toObservable()($log);
  timeElapsedTranslation.toObservable()($log);

  Object.assign(window, {
    userName,
    photoCount,
    userGender,
    duration,
    LOCALES,
  });
}

/*----*/

export function debugFluent3(): void {
  // debugFluentStore1();
  // debugFluentStore2();
  // debugFluentStore3();
  debugFluentStore4();
}


