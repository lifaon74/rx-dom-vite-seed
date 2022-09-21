import { bootstrap } from '@lirx/dom';
import { toPromiseAll } from '@lirx/core';
import { GOOGLE_DRIVE_DEFAULT_SCOPE_CONSTANT } from './api/google/drive/google-drive-default-scope.constant';
import { googleDriveListFiles } from './api/google/drive/list-files/google-drive-list-files';
import { GOOGLE_API_CONFIGURATION } from './api/google/google-api-configuration.constant';
import {
  wrapFunctionWithGoogleIdentityServiceTokenLoaderFull
} from './api/google/wrap/wrap-function-with-google-identity-service-token-loader-full';
import { AppMainComponent } from './app/main/main.component';
import { createGoogleDriveFileSystem } from './uni-fs/google-drive/create-google-drive-file-system';


// export async function debugGoogleDriveFS1() {
//   const token = await getGoogleDriveToken({
//     clientId: GOOGLE_API_CONFIG.clientId,
//   });
//
//   // console.log(token);
//
//   // https://developers.google.com/drive/api/v3/reference/about/get
//   // https://developers.google.com/drive/api/v3/reference/files/list
//
//   // const response = await fetch(`https://www.googleapis.com/drive/v3/about?fields=*&key=${API_KEY}`, {
//   //   headers: new Headers([
//   //     ['authorization', `Bearer ${token}`],
//   //   ]),
//   // });
//
//   const response = await fetch(`https://www.googleapis.com/drive/v3/files?fields=*&key=${GOOGLE_API_CONFIG.apiKey}&pageSize=10`, {
//     headers: new Headers([
//       ['authorization', `Bearer ${token}`],
//     ]),
//   });
//
//   const responseData = await response.json();
//   console.log(responseData);
// }

// export async function debugGoogleDriveFS2() {
//   const _fetch = createGoogleAPIFetcher({
//     ...GOOGLE_API_CONFIG,
//     scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
//   });
//   const files = await _fetch({
//     url: generateGoogleDriveAPIURL('files'),
//   });
//   console.log(files);
// }

export async function debugGoogleDriveFS2() {

  const _googleDriveListFiles = wrapFunctionWithGoogleIdentityServiceTokenLoaderFull(googleDriveListFiles);

  const files = await _googleDriveListFiles({
    ...GOOGLE_API_CONFIGURATION,
    scope: GOOGLE_DRIVE_DEFAULT_SCOPE_CONSTANT,
  });

  console.log(files);
}



export async function debugGoogleDriveFS3() {
  const fs = createGoogleDriveFileSystem(GOOGLE_API_CONFIGURATION);

  // console.log(await toPromiseAll(fs.children(new URL('google-drive://'))));
  console.log(await toPromiseAll(fs.list(new URL('google-drive://'))));
}

export async function fsExplorerExample() {
  bootstrap(AppMainComponent);
  // debugGoogleDriveFS1();
  // debugGoogleDriveFS2();
  // debugGoogleDriveFS3();

}

