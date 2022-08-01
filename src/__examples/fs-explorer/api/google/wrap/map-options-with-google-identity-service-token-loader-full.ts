import {
  IMapOptionsWithGoogleIdentityServiceLoaderInputOptions,
  mapOptionsWithGoogleIdentityServiceLoader,
} from './map-options-with-google-identity-service-loader';
import {
  IMapOptionsWithGoogleIdentityServiceTokenLoaderInputOptions,
  IMapOptionsWithGoogleIdentityServiceTokenLoaderOutputOptions,
  mapOptionsWithGoogleIdentityServiceTokenLoader,
} from './map-options-with-google-identity-service-token-loader';

export interface IMapOptionsWithGoogleIdentityServiceTokenLoaderFullOutputOptions extends IMapOptionsWithGoogleIdentityServiceTokenLoaderOutputOptions {
}

export type IMapOptionsWithGoogleIdentityServiceTokenLoaderFullInputOptions<GOptions extends IMapOptionsWithGoogleIdentityServiceTokenLoaderFullOutputOptions> =
  IMapOptionsWithGoogleIdentityServiceLoaderInputOptions<IMapOptionsWithGoogleIdentityServiceTokenLoaderInputOptions<GOptions>>;

export function mapOptionsWithGoogleIdentityServiceTokenLoaderFull<GOptions extends IMapOptionsWithGoogleIdentityServiceTokenLoaderFullOutputOptions>(
  options: IMapOptionsWithGoogleIdentityServiceTokenLoaderFullInputOptions<GOptions>,
): Promise<GOptions> {
  return mapOptionsWithGoogleIdentityServiceLoader(options)
    .then((options: IMapOptionsWithGoogleIdentityServiceTokenLoaderInputOptions<GOptions>): Promise<GOptions> => {
      return mapOptionsWithGoogleIdentityServiceTokenLoader(options);
    });
}
