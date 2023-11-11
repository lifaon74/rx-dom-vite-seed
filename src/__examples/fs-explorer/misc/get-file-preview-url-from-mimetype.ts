import { IFileSystemTypesSet } from '@uni-fs/core';
import { AsyncTask, asyncFetch, IAbortableOptions, Abortable } from '@lirx/async-task';

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

// export function uint8ArrayToBinaryString(
//   data: Uint8Array,
// ): string {
//   let str: string = '';
//   const bytes: Uint8Array = new Uint8Array(data);
//   for (let i = 0, l = bytes.length; i < l; i++) {
//     str += String.fromCharCode(bytes[i]);
//   }
//   return str;
// }

// export function blobToDataURL(
//   blob: Blob,
// ): IObservable<IDefaultInNotificationsUnion<string>> {
//   return pipe$$(fromPromiseFactory(() => blob.arrayBuffer()), [
//     fulfilled$$$((bytes: ArrayBuffer): IObservable<IDefaultInNotificationsUnion<string>> => {
//       return singleN(`data:${blob.type};base64,${btoa(uint8ArrayToBinaryString(new Uint8Array(bytes)))}`);
//     }),
//   ]);
// }

export interface IGetFilePreviewURLOptions extends IAbortableOptions {
  readonly previewURL?: string | undefined;
  readonly mimeType: string;
  readonly types: IFileSystemTypesSet;
}

export function getFilePreviewURL(
  {
    previewURL,
    mimeType,
    types,
    abortable,
  }: IGetFilePreviewURLOptions,
): AsyncTask<string> {
  if (previewURL === void 0) {
    if (types.has('collection')) {
      return AsyncTask.success('/assets/icons/places/folder.svg', abortable);
    } else {
      return getMimeTypePreviewURL({
        mimeType,
        abortable,
      })
        .errored((): string => {
          return '/assets/icons/mimetypes/unknown.svg';
        });
    }
  } else {
    return getGoogleThumbnailLinkPreviewURL({
      thumbnailLink: previewURL,
      abortable,
    })
      .errored((_, abortable: Abortable): AsyncTask<string> => {
        console.log('failed with preview', previewURL);
        return getFilePreviewURL({
          mimeType,
          types,
          abortable,
        });
      });
  }
}

/*------*/

export interface IGetGoogleThumbnailLinkPreviewURLOptions extends IAbortableOptions {
  readonly  thumbnailLink: string;
}

export function getGoogleThumbnailLinkPreviewURL(
  {
    thumbnailLink,
    abortable,
  }: IGetGoogleThumbnailLinkPreviewURLOptions,
): AsyncTask<string> {
  return asyncFetch(thumbnailLink, {
    // method: 'OPTIONS',
    method: 'GET',
  }, abortable)
    .successful((response: Response) => {
      if (response.ok) {
        // return response.blob()
        //   .then((blob: Blob) => {
        //     return blob.text()
        //       .then((data) => {
        //         return `data:${blob.type};base64,${btoa(data)}`
        //       })
        //   })
        return thumbnailLink;
      } else {
        throw new Error(response.statusText);
      }
    });
}

/*------*/

export interface IGetMimeTypePreviewURLOptions extends IAbortableOptions {
  readonly mimeType: string;
}

export function getMimeTypePreviewURL(
  {
    mimeType,
    abortable,
  }: IGetMimeTypePreviewURLOptions,
): AsyncTask<string> {
  const url: string = `/assets/icons/mimetypes/${mimeType.replace('/', '-')}.svg`;
  return asyncFetch(url, {
    method: 'OPTIONS',
  }, abortable)
    .successful((response: Response) => {
      if (response.ok) {
        return url;
      } else {
        throw new Error(response.statusText);
      }
    });
}

/*------------*/

// export function fromFetchDataURL(
//   requestInfo: RequestInfo,
//   requestInit?: RequestInit,
// ): IObservable<IDefaultInNotificationsUnion<string>> {
//   return fulfilled$$(fromFetchBlob(requestInfo, requestInit), blobToDataURL);
// }
//
// export function generateGoogleThumbnailLinkPreviewURL(
//   thumbnailLink: string,
// ): IObservable<IDefaultInNotificationsUnion<string>> {
//   return fromFetchDataURL(thumbnailLink, {
//     referrerPolicy: 'no-referrer',
//     referrer: 'no-referrer',
//   });
// }
//
// /*---*/
//
// const unknownPreviewURL$: IObservable<IDefaultInNotificationsUnion<string>> = shareR$$(fromFetchDataURL(`/assets/icons/mimetypes/unknown.svg`));
//
// const mimeTypeToPreviewURLMap = new Map<string, IObservable<IDefaultInNotificationsUnion<string>>>();
//
// export function generateMimetypePreviewURL(
//   mimeType: string,
// ): IObservable<IDefaultInNotificationsUnion<string>> {
//   let mimeTypePreviewURL$: IObservable<IDefaultInNotificationsUnion<string>> | undefined = mimeTypeToPreviewURLMap.get(mimeType);
//
//   if (mimeTypePreviewURL$ === void 0) {
//     mimeTypePreviewURL$ = pipe$$(fromFetchDataURL(getFilePreviewURLFromMimetype(mimeType)), [
//       rejected$$$((): IObservable<IDefaultInNotificationsUnion<string>> => unknownPreviewURL$),
//       shareR$$$<IDefaultInNotificationsUnion<string>>(),
//     ]);
//     mimeTypeToPreviewURLMap.set(mimeType, mimeTypePreviewURL$);
//   }
//
//   return mimeTypePreviewURL$;
// }
//
// /*---*/
//
// const directoryPreviewURL$: IObservable<IDefaultInNotificationsUnion<string>> = shareR$$(fromFetchDataURL(`/assets/icons/places/folder.svg`));
//
// export function generateDirectoryPreviewURL(): IObservable<IDefaultInNotificationsUnion<string>> {
//   return directoryPreviewURL$;
// }
