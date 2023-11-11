import {
  fromFetchBlob,
  fromPromiseFactory,
  fulfilled$$,
  fulfilled$$$,
  IDefaultInNotificationsUnion,
  IObservable,
  pipe$$,
  rejected$$$,
  shareR$$,
  shareR$$$,
  singleN,
} from '@lirx/core';
import { IFileSystemTypesSet } from '@uni-fs/core';

export function getFilePreviewURLFromMimetype(
  mimeType: string,
): string {
  return `/assets/icons/mimetypes/${mimeType.replace('/', '-')}.svg`;
}

/*------*/

// export function awaitImageLoaded(
//   image: HTMLImageElement,
// ): Promise<HTMLImageElement> {
//   return new Promise<HTMLImageElement>((
//     resolve: (value: HTMLImageElement) => void,
//     reject: (reason?: any) => void,
//   ): void => {
//
//     const _resolve = () => {
//       if (image.naturalWidth === 0) {
//         _reject();
//       } else {
//         resolve(image);
//       }
//     };
//
//     const _reject = () => {
//       reject(new Error(`Failed to load image`));
//     };
//
//     if (image.complete) {
//       _resolve();
//     } else {
//       image.addEventListener('load', _resolve);
//       image.addEventListener('error', _reject);
//     }
//   });
// }

export function uint8ArrayToBinaryString(
  data: Uint8Array,
): string {
  let str: string = '';
  const bytes: Uint8Array = new Uint8Array(data);
  for (let i = 0, l = bytes.length; i < l; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return str;
}

export function blobToDataURL(
  blob: Blob,
): IObservable<IDefaultInNotificationsUnion<string>> {
  return pipe$$(fromPromiseFactory(() => blob.arrayBuffer()), [
    fulfilled$$$((bytes: ArrayBuffer): IObservable<IDefaultInNotificationsUnion<string>> => {
      return singleN(`data:${blob.type};base64,${btoa(uint8ArrayToBinaryString(new Uint8Array(bytes)))}`);
    }),
  ]);
}

export interface IGenerateFilePreviewURLOptions {
  previewURL?: string | undefined;
  mimeType: string;
  types: IFileSystemTypesSet;
}

export function generateFilePreviewURL(
  {
    previewURL,
    mimeType,
    types,
  }: IGenerateFilePreviewURLOptions,
): IObservable<IDefaultInNotificationsUnion<string>> {

  if (previewURL === void 0) {
    if (types.has('directory')) {
      return generateDirectoryPreviewURL();
    } else {
      return generateMimetypePreviewURL(mimeType);
    }
  } else {
    return pipe$$(
      generateGoogleThumbnailLinkPreviewURL(previewURL),
      [
        rejected$$$(() => {
          return generateFilePreviewURL({
            mimeType,
            types,
          });
        }),
      ],
    );
  }
}

export function fromFetchDataURL(
  requestInfo: RequestInfo,
  requestInit?: RequestInit,
): IObservable<IDefaultInNotificationsUnion<string>> {
  return fulfilled$$(fromFetchBlob(requestInfo, requestInit), blobToDataURL);
}

export function generateGoogleThumbnailLinkPreviewURL(
  thumbnailLink: string,
): IObservable<IDefaultInNotificationsUnion<string>> {
  return fromFetchDataURL(thumbnailLink, {
    referrerPolicy: 'no-referrer',
    referrer: 'no-referrer',
  });
}

/*---*/

const unknownPreviewURL$: IObservable<IDefaultInNotificationsUnion<string>> = shareR$$(fromFetchDataURL(`/assets/icons/mimetypes/unknown.svg`));

const mimeTypeToPreviewURLMap = new Map<string, IObservable<IDefaultInNotificationsUnion<string>>>();

export function generateMimetypePreviewURL(
  mimeType: string,
): IObservable<IDefaultInNotificationsUnion<string>> {
  let mimeTypePreviewURL$: IObservable<IDefaultInNotificationsUnion<string>> | undefined = mimeTypeToPreviewURLMap.get(mimeType);

  if (mimeTypePreviewURL$ === void 0) {
    mimeTypePreviewURL$ = pipe$$(fromFetchDataURL(getFilePreviewURLFromMimetype(mimeType)), [
      rejected$$$((): IObservable<IDefaultInNotificationsUnion<string>> => unknownPreviewURL$),
      shareR$$$<IDefaultInNotificationsUnion<string>>(),
    ]);
    mimeTypeToPreviewURLMap.set(mimeType, mimeTypePreviewURL$);
  }

  return mimeTypePreviewURL$;
}

/*---*/

const directoryPreviewURL$: IObservable<IDefaultInNotificationsUnion<string>> = shareR$$(fromFetchDataURL(`/assets/icons/places/folder.svg`));

export function generateDirectoryPreviewURL(): IObservable<IDefaultInNotificationsUnion<string>> {
  return directoryPreviewURL$;
}
