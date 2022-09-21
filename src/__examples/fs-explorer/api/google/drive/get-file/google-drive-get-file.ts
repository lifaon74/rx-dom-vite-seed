import { booleanToString } from '../../../helpers/boolean-to-string';
import { fetchGoogleAPI, IFetchGoogleAPIOptions } from '../../fetch-google-api';
import { IGoogleDriveAPIFile } from '../list-files/google-drive-list-files.interfaces';

/**
 * API DOC: https://developers.google.com/drive/api/v3/reference/files/get
 * https://developers.google.com/drive/api/guides/manage-downloads
 */

export type IGoogleDriveGetFileOptionsIncludePermissionsForView =
  | 'published'
  ;

export type IGoogleDriveGetFileOptionsAlt =
  | 'media'
  ;

// https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.35
export type IGoogleDriveGetFileOptionsRange = [
  start: number,
  end?: number,
];

export interface IGoogleDriveGetFileOptions extends Pick<IFetchGoogleAPIOptions, 'apiKey' | 'token'> {
  fileId: string;
  alt?: IGoogleDriveGetFileOptionsAlt;
  ranges?: readonly IGoogleDriveGetFileOptionsRange[];
  acknowledgeAbuse?: boolean;
  fields?: string;
  includePermissionsForView?: IGoogleDriveGetFileOptionsIncludePermissionsForView;
  supportsAllDrives?: boolean;
}

export function googleDriveGetFile(
  {
    fileId,
    alt,
    ranges,
    acknowledgeAbuse,
    fields,
    includePermissionsForView,
    supportsAllDrives,
    ...options
  }: IGoogleDriveGetFileOptions,
): Promise<Response> {
  const url: URL = new URL(`https://www.googleapis.com/drive/v3/files/${fileId}`);
  const headers: Headers = new Headers();

  if (alt !== void 0) {
    url.searchParams.set('alt', alt);
  }

  if (acknowledgeAbuse !== void 0) {
    url.searchParams.set('acknowledgeAbuse', booleanToString(acknowledgeAbuse));
  }

  if (fields !== void 0) {
    url.searchParams.set('fields', fields);
  }

  if (includePermissionsForView !== void 0) {
    url.searchParams.set('fields', includePermissionsForView);
  }

  if (supportsAllDrives !== void 0) {
    url.searchParams.set('supportsAllDrives', booleanToString(supportsAllDrives));
  }

  if (
    (ranges !== void 0)
    && (ranges.length > 0)
  ) {
    const _range: string = ranges
      .map(([start, end]: IGoogleDriveGetFileOptionsRange): string => {
        if (start < 0) {
          if (end === void 0) {
            return `${start}`;
          } else {
            throw new Error(`If start is negative, end must not be present`);
          }
        } else {
          return `${start}-${(end === void 0) ? '' : end}`;
        }
      })
      .join(',');

    headers.set('Range', `bytes=${_range}`);
  }

  return fetchGoogleAPI({
    ...options,
    url,
    headers,
  });
}

/*---------*/

export interface IGoogleDriveDownloadFileOptions extends Omit<IGoogleDriveGetFileOptions, 'alt'> {
}

export function googleDriveDownloadFile(
  options: IGoogleDriveDownloadFileOptions,
): Promise<Response> {
  return googleDriveGetFile({
    ...options,
    alt: 'media',
  });
}

/*---------*/

export interface IGoogleDriveGetFileDetailsOptions extends Omit<IGoogleDriveGetFileOptions, 'alt'> {
}

export function googleDriveGetFileDetails(
  options: IGoogleDriveGetFileDetailsOptions,
): Promise<IGoogleDriveAPIFile> {
  return googleDriveGetFile(options)
    .then((response: Response): Promise<IGoogleDriveAPIFile> => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Unable to get file details`);
      }
    });
}

/*---------*/

export interface IGoogleDriveGetFileSizeOptions extends Omit<IGoogleDriveGetFileDetailsOptions, 'alt' | 'ranges' | 'fields'> {
}

export function googleDriveGetFileSize(
  options: IGoogleDriveGetFileSizeOptions,
): Promise<number> {
  return googleDriveGetFileDetails({
    ...options,
    fields: 'size',
  })
    .then((file: IGoogleDriveAPIFile): number => {
      const size: number = Number(file.size);
      if (Number.isSafeInteger(size)) {
        return size;
      } else {
        throw new Error(`Unable to retrieve the size of this file`);
      }
    });
}

