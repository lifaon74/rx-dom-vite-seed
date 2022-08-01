import {
  LocalStorageKeyValueDatabase,
  SHARED_LOCAL_STORAGE_KEY_VALUE_DATABASE,
} from '../../../../helpers/key-value-database/local-storage-key-value-database';
import { IGoogleIdentityService, IGoogleIdentityServiceToken } from './load-google-identity-service';

export interface IGetGoogleIdentityServiceToken {
  gis: IGoogleIdentityService;
  clientId: string;
  scope: string;
}

export function getGoogleIdentityServiceToken(
  {
    gis,
    clientId,
    scope,
  }: IGetGoogleIdentityServiceToken,
): Promise<string> {
  return new Promise<string>((
    resolve: (value: string) => void,
  ): void => {
    const key: string = 'gapi-token';

    interface IToken {
      expirationDate: number;
      token: string;
    }

    const db: LocalStorageKeyValueDatabase<IToken> = SHARED_LOCAL_STORAGE_KEY_VALUE_DATABASE as LocalStorageKeyValueDatabase<IToken>;

    const requestToken = (): void => {
      const tokenClient = gis.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: scope,
        callback: (token: IGoogleIdentityServiceToken): void => {
          db.set(key, {
            expirationDate: Date.now() + (token.expires_in * 1000),
            token: token.access_token,
          });
          resolve(token.access_token);
        },
      });

      tokenClient.requestAccessToken({ prompt: '' });
    };

    if (db.has(key)) {
      const token: IToken = db.get(key)!;
      if (token.expirationDate > Date.now()) {
        resolve(token.token);
      } else {
        requestToken();
      }
    } else {
      requestToken();
    }
  });
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

