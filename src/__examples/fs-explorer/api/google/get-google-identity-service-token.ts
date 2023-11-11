import {
  LocalStorageKeyValueDatabase,
  SHARED_LOCAL_STORAGE_KEY_VALUE_DATABASE,
} from '../../../../helpers/key-value-database/local-storage-key-value-database';
import { IGoogleIdentityService, IGoogleIdentityServiceToken } from './load-google-identity-service';
import { AsyncTask, IAbortableOptions, IAsyncTaskSuccessFunction } from '@lirx/async-task';

export interface IGetGoogleIdentityServiceToken extends IAbortableOptions {
  readonly gis: IGoogleIdentityService;
  readonly clientId: string;
  readonly scope: string;
}

export function getGoogleIdentityServiceToken(
  {
    gis,
    clientId,
    scope,
    abortable,
  }: IGetGoogleIdentityServiceToken,
): AsyncTask<string> {
  return new AsyncTask<string>((
    success: IAsyncTaskSuccessFunction<string>,
  ): void => {
    const key: string = 'gapi-token';

    interface IToken {
      expirationDate: number;
      token: string;
    }

    const db: LocalStorageKeyValueDatabase<IToken> = SHARED_LOCAL_STORAGE_KEY_VALUE_DATABASE;

    const requestToken = (): void => {
      const tokenClient = gis.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: scope,
        callback: (token: IGoogleIdentityServiceToken): void => {
          db.set(key, {
            expirationDate: Date.now() + (token.expires_in * 1000),
            token: token.access_token,
          });
          success(token.access_token);
        },
      });

      tokenClient.requestAccessToken({ prompt: '' });
    };

    if (db.has(key)) {
      const token: IToken = db.get(key)!;
      if (token.expirationDate > Date.now()) {
        success(token.token);
      } else {
        requestToken();
      }
    } else {
      requestToken();
    }
  }, abortable);
}

/*------------*/

// export interface IGetGoogleIdentityServiceToken extends IWrapFunctionWithGoogleIdentityServiceLoaderOutputOptions<IGetGoogleIdentityServiceTokenRaw> {
// }
//
// export const getGoogleIdentityServiceToken = wrapFunctionWithGoogleIdentityServiceLoader(getGoogleIdentityServiceTokenRaw);

// export function getGoogleIdentityServiceToken(
//   options: IGetGoogleIdentityServiceToken,
// ): Promise<string> {
//   return loadGoogleIdentityService()
//     .then((gis: IGoogleIdentityService): Promise<string> => {
//       return getGoogleIdentityServiceTokenRaw({
//         ...options,
//         gis,
//       });
//     });
// }

