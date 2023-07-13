import { $log, map$$, signal, single, string$$ } from '@lirx/core';
import { createDateTimeFormatFunction } from '../../intl/date-time/date-time-format.class';
import { LOCALES$ } from '../../intl/locale/locales.constants';
import { ObservableTranslations } from '../../intl/translate/observable/observable-translations.class';
import {
  convertObjectOfObservableLikesToSignalTranslateVariables,
} from '../../intl/translate/signal/functions/convert-object-of-observable-likes-to-signal-translate-variables';
import { Translations } from '../../intl/translate/translations.class';
import { ITranslationsEntry } from '../../intl/translate/types/class/translations-entry.type';
import { ITranslateFunctionFunctions } from '../../intl/translate/types/translate-function-functions.type';
import { ITranslateFunctionVariables } from '../../intl/translate/types/translate-function-variables.type';
import {
  ITranslationsIterable,
} from '../../intl/translate/types/class/translations-iterable.type';
import {
  convertListFormatFunctionToFluentListFormat,
} from '../built-in/call-function/built-in/list/convert-list-format-function-to-fluent-list-format';
import { createFluentMessageOptions } from '../built-in/message/create-fluent-message-options';
import { FluentLoaderSignalTranslationsStore } from '../signal/fluent-loader-signal-translations-store.class';
import { FluentSignalTranslationsStore } from '../signal/fluent-signal-translations-store.class';

import messages from './samples/01/sample-01.en';

/*----*/

import message from `./samples/01/sample-01.en.ftl?raw`;

/*----*/

function debugFluentStore1(): void {
  const store: Translations = new Translations([
    ['abc', ({ name }) => `Hello ${name}`],
  ]);

  const str = store.translate('abc', {
    name: 'Alice',
  }/*, {
    numberFormat: createNumberFormatFunction(),
    dateTimeFormat: createDateTimeFormatFunction(),
    abc: createDateTimeFormatFunction(),
  }*/);

  console.log(str);
}

function debugFluentStoreObservable1(): void {
  const store: ObservableTranslations = new ObservableTranslations(single([
    ['abc', (variables$) => string$$`Hello ${map$$(variables$, _ => _.name)}`],
  ]));

  const str = store.translate('abc', single({
    name: 'Alice',
  }));

  console.log(str);
}

function debugFluentStore2(): void {

  const translations: ITranslationsIterable = Array.from(messages.entries(), ([key, fluentMessageFunction]): ITranslationsEntry => {
    return [
      key,
      (
        variables: ITranslateFunctionVariables,
        functions: ITranslateFunctionFunctions,
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

  const store: Translations = new Translations(translations);

  const str = store.translate('shared-photos', {
    userName: 'Alice',
    photoCount: 5,
    userGender: 'female',
  });

  console.log(str);
}

function debugFluentStore3(): void {
  const store = new FluentSignalTranslationsStore(signal(messages));

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
    LOCALES$,
  });
}

/*----*/

export function debugFluent3(): void {
  // debugFluentStore1();
  debugFluentStoreObservable1();
  // debugFluentStore2();
  // debugFluentStore3();
  // debugFluentStore4();
}


