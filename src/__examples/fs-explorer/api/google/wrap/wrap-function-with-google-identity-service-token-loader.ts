import { AsyncTask, Abortable, IAsyncTaskConstraint, IAbortableOptions } from '@lirx/async-task';
import { loadGoogleIdentityService, IGoogleIdentityService } from '../load-google-identity-service';
import { getGoogleIdentityServiceToken, IGetGoogleIdentityServiceToken } from '../get-google-identity-service-token';

export interface IWrapFunctionWithGoogleIdentityServiceTokenLoaderInputFunction<GOptions, GReturn extends IAsyncTaskConstraint<GReturn>> {
  (
    options: GOptions,
  ): AsyncTask<GReturn>,
}

export interface IWrapFunctionWithGoogleIdentityServiceTokenLoaderOutputFunction<GOptions, GReturn extends IAsyncTaskConstraint<GReturn>> {
  (
    options: IWrapFunctionWithGoogleIdentityServiceTokenLoaderOutputOptions<GOptions>,
  ): AsyncTask<GReturn>,
}

export type IWrapFunctionWithGoogleIdentityServiceTokenLoaderOutputOptions<GOptions> =
  Omit<GOptions, 'gis' | 'token'>
  & Omit<IGetGoogleIdentityServiceToken, 'gis'>;

export function wrapFunctionWithGoogleIdentityServiceTokenLoader<GOptions, GReturn extends IAsyncTaskConstraint<GReturn>>(
  fnc: IWrapFunctionWithGoogleIdentityServiceTokenLoaderInputFunction<GOptions, GReturn>,
): IWrapFunctionWithGoogleIdentityServiceTokenLoaderOutputFunction<GOptions, GReturn> {
  return (
    options: IWrapFunctionWithGoogleIdentityServiceTokenLoaderOutputOptions<GOptions>,
  ): AsyncTask<GReturn> => {
    return runFunctionWithGoogleIdentityServiceTokenLoader(fnc, options);
  };
}

export function runFunctionWithGoogleIdentityServiceTokenLoader<GOptions, GReturn extends IAsyncTaskConstraint<GReturn>>(
  fnc: IWrapFunctionWithGoogleIdentityServiceTokenLoaderInputFunction<GOptions, GReturn>,
  {
    abortable,
    ...options
  }: IWrapFunctionWithGoogleIdentityServiceTokenLoaderOutputOptions<GOptions>,
): AsyncTask<GReturn> {
  return loadGoogleIdentityService(abortable)
    .successful((gis: IGoogleIdentityService, abortable: Abortable): AsyncTask<GReturn> => {
      return getGoogleIdentityServiceToken({
        ...options,
        gis,
        abortable,
      })
        .successful((token: string, abortable: Abortable): AsyncTask<GReturn> => {
          return fnc({
            ...options,
            abortable,
            gis,
            token,
          } as GOptions);
        });
    });
}
