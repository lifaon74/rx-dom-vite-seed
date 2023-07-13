import { $log, map$$, signal, single, string$$ } from '@lirx/core';
import { LOCALES$ } from '../../intl/locale/locales.constants';
import { ObservableTranslations } from '../../intl/translate/observable/observable-translations.class';
import { Translations } from '../../intl/translate/translations.class';
import { FluentObservableTranslations } from '../observable/fluent-observable-translations.class';

/*----*/

/*----*/

function debugFluentTranslations1(): void {
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

function debugFluentTranslations2(): void {
  const store: ObservableTranslations = new ObservableTranslations(single([
    ['abc', ({ name }) => string$$`Hello ${name}`],
  ]));

  const str = store.translate('abc', {
    name: single('Alice'),
  });

  str($log);
  // compileFluentObservableResource();
}

function debugFluentTranslations3(): void {

  const store = FluentObservableTranslations.loader({
    availableLocales: ['en', 'fr'],
    getURL: (locale: string) => new URL(`./samples/01/sample-01.${locale}.ftl`, import.meta.url),
  });

  // const translation$ = store.translate('hello-user', single({
  //   userName: 'abc',
  // }));


  const userName = signal('Alice');
  const photoCount = signal(0);
  const userGender = signal('female');
  const duration = signal(4.2);

  const sharedPhotoTranslation$ = store.translate('shared-photos', {
    userName,
    photoCount,
    userGender,
  });

  const timeElapsedTranslation$ = store.translate('time-elapsed', {
    duration,
  });

  sharedPhotoTranslation$($log);
  timeElapsedTranslation$($log);

  Object.assign(window, {
    userName,
    photoCount,
    userGender,
    duration,
    LOCALES$,
  });
}

/*----*/

export function debugFluent4(): void {
  // debugFluentStore1();
  // debugFluentStoreObservable1();
  debugFluentTranslations3();
}


