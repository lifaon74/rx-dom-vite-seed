export interface ILocaleMatcherMatchFunctionOptions {
  algorithm?: 'lookup' | 'best fit';
}

export interface ILocaleMatcherMatchFunction {
  (
    requestedLocales: readonly string[],
    availableLocales: readonly string[],
    defaultLocale: string,
    options?: ILocaleMatcherMatchFunctionOptions,
  ): string;
}

export interface ILocaleMatcher {
  match: ILocaleMatcherMatchFunction;
}
