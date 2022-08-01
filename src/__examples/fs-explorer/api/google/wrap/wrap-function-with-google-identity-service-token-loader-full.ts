import { wrapFunctionWithAsyncOptionsMapper } from '../../../misc/wrap-function-with-async-options-mapper';
import {
  IMapOptionsWithGoogleIdentityServiceTokenLoaderFullInputOptions,
  IMapOptionsWithGoogleIdentityServiceTokenLoaderFullOutputOptions,
  mapOptionsWithGoogleIdentityServiceTokenLoaderFull,
} from './map-options-with-google-identity-service-token-loader-full';

export interface IWrapFunctionWithGoogleIdentityServiceTokenLoaderFullInputFunction<GOptions extends IMapOptionsWithGoogleIdentityServiceTokenLoaderFullOutputOptions, GReturn> {
  (
    options: GOptions,
  ): Promise<GReturn>,
}

export interface IWrapFunctionWithGoogleIdentityServiceTokenLoaderFullOutputFunction<GOptions extends IMapOptionsWithGoogleIdentityServiceTokenLoaderFullOutputOptions, GReturn> {
  (
    options: IMapOptionsWithGoogleIdentityServiceTokenLoaderFullInputOptions<GOptions>,
  ): Promise<GReturn>,
}

export function wrapFunctionWithGoogleIdentityServiceTokenLoaderFull<GOptions extends IMapOptionsWithGoogleIdentityServiceTokenLoaderFullOutputOptions, GReturn>(
  fnc: IWrapFunctionWithGoogleIdentityServiceTokenLoaderFullInputFunction<GOptions, GReturn>,
): IWrapFunctionWithGoogleIdentityServiceTokenLoaderFullOutputFunction<GOptions, GReturn> {
  return wrapFunctionWithAsyncOptionsMapper<IMapOptionsWithGoogleIdentityServiceTokenLoaderFullInputOptions<GOptions>, GOptions, GReturn>(
    fnc,
    mapOptionsWithGoogleIdentityServiceTokenLoaderFull,
  );
}
