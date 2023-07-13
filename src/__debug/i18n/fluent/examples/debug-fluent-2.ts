import { $log, let$$ } from '@lirx/core';

/*----*/

export function debugFluent2(): void {
  const [$userName, userName$] = let$$('Anne');
  const [$photoCount, photoCount$] = let$$(5);
  const [$userGender, userGender$] = let$$<string>('female');

  const translate = createFluentTranslateFunctionLoader({
    locales$: LOCALES_LIST$,
    availableLocales: ['en', 'fr'],
    getURL: (locale: string) => new URL(`./samples/01/sample-01.${locale}.ftl`, import.meta.url),
  });

  const translated$ = translate('shared-photos', {
    userName$,
    photoCount$,
    userGender$,
  });

  translated$($log);

  setTimeout(() => {
    $photoCount(1);

    setTimeout(() => {
      $userName('Paul');
      $userGender('male');

      setTimeout(() => {
        $LOCALES(['fr']);
      }, 200);
    }, 200);
  }, 1000);
}


