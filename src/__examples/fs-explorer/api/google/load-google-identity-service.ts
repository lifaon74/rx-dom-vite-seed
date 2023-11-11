import { AsyncTask, Abortable } from '@lirx/async-task';
import { IAsyncTaskSuccessFunction } from '@lirx/async-task/src/async-task/types/init/async-task-success-function.type';
import { IAsyncTaskErrorFunction } from '@lirx/async-task/src/async-task/types/init/async-task-error-function.type';

export interface IGoogleIdentityServiceToken {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: 'Bearer';
}

export interface IGoogleIdentityServiceInitTokenClientOptionsCallbackFunction {
  (
    token: IGoogleIdentityServiceToken,
  ): void;
}

export interface IGoogleIdentityServiceInitTokenClientOptions {
  client_id: string;
  scope: string;
  callback: IGoogleIdentityServiceInitTokenClientOptionsCallbackFunction;
}

export interface IGoogleIdentityServiceInitTokenClientFunction {
  (
    options: IGoogleIdentityServiceInitTokenClientOptions,
  ): IGoogleIdentityServiceTokenClient;
}

export interface IGoogleIdentityServiceTokenClientRequestAccessTokenFunction {
  (
    options: any,
  ): void;
}

export interface IGoogleIdentityServiceTokenClient {
  requestAccessToken: IGoogleIdentityServiceTokenClientRequestAccessTokenFunction;
}

export interface IGoogleIdentityServiceOAuth2 {
  initTokenClient: IGoogleIdentityServiceInitTokenClientFunction;
}

export interface IGoogleIdentityServiceAccounts {
  id: any;
  oauth2: IGoogleIdentityServiceOAuth2;
}

export interface IGoogleIdentityService {
  accounts: IGoogleIdentityServiceAccounts;
}

export function loadGoogleIdentityService(
  abortable: Abortable,
): AsyncTask<IGoogleIdentityService> {
  return new AsyncTask<IGoogleIdentityService>((
    success: IAsyncTaskSuccessFunction<IGoogleIdentityService>,
    error: IAsyncTaskErrorFunction,
    abortable: Abortable
  ): void => {
    if ('google' in globalThis) {
      success((globalThis as any).google);
    } else {
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.addEventListener('load', () => {
        success((globalThis as any).google);
      });
      script.addEventListener('error', () => {
        error(new Error(`Failed to load`));
      });
      script.src = 'https://accounts.google.com/gsi/client';
      document.head.appendChild(script);
    }
  }, abortable);
}

