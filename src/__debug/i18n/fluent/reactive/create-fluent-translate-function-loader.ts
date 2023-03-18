import { ITranslateFunction } from '../../reactive/translation/translate-function.type';
import { createFluentTranslateFunction, ICreateFluentTranslateFunctionOptions } from './create-fluent-translate-function';
import { createFluentTranslationsLoader, ICreateFluentTranslationsLoaderOptions } from './create-fluent-translations-loader';

export interface ICreateFluentTranslateFunctionLoaderOptions extends ICreateFluentTranslationsLoaderOptions, Omit<ICreateFluentTranslateFunctionOptions, 'translations$'> {

}
export function createFluentTranslateFunctionLoader(
  options: ICreateFluentTranslateFunctionLoaderOptions,
): ITranslateFunction {
  return createFluentTranslateFunction({
    ...options,
    translations$: createFluentTranslationsLoader(options),
  });
}
