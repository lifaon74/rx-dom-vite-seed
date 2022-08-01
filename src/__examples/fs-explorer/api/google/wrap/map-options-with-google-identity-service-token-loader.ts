import { getGoogleIdentityServiceToken, IGetGoogleIdentityServiceToken } from '../get-google-identity-service-token';

export interface IMapOptionsWithGoogleIdentityServiceTokenLoaderOutputOptions {
  token: string;
}

export type IMapOptionsWithGoogleIdentityServiceTokenLoaderInputOptions<GOptions extends IMapOptionsWithGoogleIdentityServiceTokenLoaderOutputOptions> =
  Omit<GOptions, 'token'>
  & IGetGoogleIdentityServiceToken;

export function mapOptionsWithGoogleIdentityServiceTokenLoader<GOptions extends IMapOptionsWithGoogleIdentityServiceTokenLoaderOutputOptions>(
  options: IMapOptionsWithGoogleIdentityServiceTokenLoaderInputOptions<GOptions>,
): Promise<GOptions> {
  return getGoogleIdentityServiceToken(options)
    .then((token: string): GOptions => {
      return {
        ...options,
        token,
      } as unknown as GOptions;
    });
}
