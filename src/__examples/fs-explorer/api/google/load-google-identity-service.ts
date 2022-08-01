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

export function loadGoogleIdentityService(): Promise<IGoogleIdentityService> {
  return new Promise<IGoogleIdentityService>((
    resolve: (value: IGoogleIdentityService) => void,
    reject: (reason?: any) => void,
  ): void => {
    if ('google' in globalThis) {
      resolve((globalThis as any).google);
    } else {
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.addEventListener('load', () => {
        resolve((globalThis as any).google);
      });
      script.addEventListener('error', () => {
        reject(new Error(`Failed to load`));
      });
      script.src = 'https://accounts.google.com/gsi/client';
      document.head.appendChild(script);
    }
  });
}

