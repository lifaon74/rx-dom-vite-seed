import { IGoogleIdentityService, loadGoogleIdentityService } from '../load-google-identity-service';

export interface IMapOptionsWithGoogleIdentityServiceLoaderOutputOptions {
  gis: IGoogleIdentityService;
}

export type IMapOptionsWithGoogleIdentityServiceLoaderInputOptions<GOptions extends IMapOptionsWithGoogleIdentityServiceLoaderOutputOptions> =
  Omit<GOptions, 'gis'>;

export function mapOptionsWithGoogleIdentityServiceLoader<GOptions extends IMapOptionsWithGoogleIdentityServiceLoaderOutputOptions>(
  options: IMapOptionsWithGoogleIdentityServiceLoaderInputOptions<GOptions>,
): Promise<GOptions> {
  return loadGoogleIdentityService()
    .then((gis: IGoogleIdentityService): GOptions => {
      return {
        ...options,
        gis,
      } as GOptions;
    });
}
