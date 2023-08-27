import {
  $log,
  debounceMicrotaskObservable,
  fromPromiseFactory,
  interval,
  map$$,
  notificationsToLastValue$$,
  scan$$,
  signal,
  single,
  string$$,
} from '@lirx/core';
import { ObservableDateTimeFormat } from '../../intl/date-time/observable/observable-date-time-format.class';
import { LOCALES } from '../../intl/locale/locales.constants';
import {
  createObservableTranslationsLoader,
  IIterableOfObservableTranslationsEntryModule,
} from '../../intl/translate/observable/functions/create-observable-translations-loader';
import {
  ObservableTranslations,
} from '../../intl/translate/observable/observable-translations.class';
import { IObservableTranslationsIterable } from '../../intl/translate/observable/types/class/observable-translations-iterable.type';
import { Translations } from '../../intl/translate/translations.class';
import { IReadonlyFluentMessagesMap } from '../built-in/message/map/fluent-messages-map.type';
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

  const store = FluentObservableTranslations.urlLoader({
    availableLocales: ['en', 'fr'],
    getURL: (locale: string) => new URL(`./samples/01/sample-01.${locale}.ftl`, import.meta.url),
  });

  const userName = signal('Alice');
  const photoCount = signal(0);
  const userGender = signal('female');
  const duration = signal(4.2);
  const vehicles = signal(['Plane']);

  const sharedPhotoTranslation$ = store.translate('shared-photos', {
    userName,
    photoCount,
    userGender,
  });

  const timeElapsedTranslation$ = store.translate('time-elapsed', {
    duration,
  });

  const dateTranslation$ = store.translate('log-time', {
    date: map$$(interval(1000), () => Date.now()),
  }, {
    // dateTimeFormat: new ObservableDateTimeFormat(LOCALES.observe, {
    //   dateStyle: 'full',
    //   timeStyle: 'medium',
    // }).format,
  });

  const listTranslation$ = store.translate('list', {
    vehicles,
  });

  sharedPhotoTranslation$($log);
  timeElapsedTranslation$($log);
  dateTranslation$($log);
  listTranslation$($log);

  Object.assign(window, {
    store,
    userName,
    photoCount,
    userGender,
    duration,
    vehicles,
    LOCALES,
  });
}

function debugFluentTranslations4(): void {
  const store = createObservableTranslationsLoader({
    availableLocales: ['en', 'fr'],
    load: (locale: string): Promise<IIterableOfObservableTranslationsEntryModule> => {
      return import(`./samples/01/sample-01.${locale}.ts`);
    },
  });

  const duration = signal(4.2);

  const timeElapsedTranslation$ = store.translate('time-elapsed', {
    duration,
  });

  timeElapsedTranslation$($log);
}

/*----*/

export function debugFluent4(): void {
  // debugFluentStore1();
  // debugFluentStoreObservable1();
  debugFluentTranslations3();
  // debugFluentTranslations4();
}


