import { ILocaleMatcher } from './locale-matcher.type';

function getIntlLocaleMatcherAsync(): Promise<ILocaleMatcher> {
  return ('LocalMatcher' in globalThis.Intl)
    ? (globalThis.Intl as any).LocalMatcher
    // @ts-ignore
    : import('https://cdn.skypack.dev/@formatjs/intl-localematcher')
      .then((mod: ILocaleMatcher): ILocaleMatcher => {
        return Object.freeze({
          match: mod.match,
        });
      });
}

const LocalMatcher: ILocaleMatcher = await getIntlLocaleMatcherAsync();

export function getIntlLocaleMatcher(): ILocaleMatcher {
  return LocalMatcher;
}

