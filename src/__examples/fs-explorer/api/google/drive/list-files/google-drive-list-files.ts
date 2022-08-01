import { arrayToString } from '../../../helpers/array-to-string';
import { booleanToString } from '../../../helpers/boolean-to-string';
import { numberToString } from '../../../helpers/number-to-string';
import { fetchJSONGoogleAPI, IFetchGoogleAPIOptions } from '../../fetch-google-api';
import { IGoogleDriveAPIFilesList } from './google-drive-list-files.interfaces';

/**
 * API DOC: https://developers.google.com/drive/api/v3/reference/files/list
 * query doc: https://developers.google.com/drive/api/guides/search-files#node.js
 */


export type IGoogleDriveListFilesOptionsCorporaKeys =
  | 'user'
  | 'drive'
  | 'domain'
  | 'allDrives'
  ;

export type IGoogleDriveListFilesOptionsOrderByKeys =
  | 'createdTime'
  | 'folder'
  | 'modifiedByMeTime'
  | 'modifiedTime'
  | 'name'
  | 'name_natural'
  | 'quotaBytesUsed'
  | 'recency'
  | 'sharedWithMeTime'
  | 'starred'
  | 'viewedByMeTime'
  ;

export interface IGoogleDriveListFilesOptionsOrderBy {
  key: IGoogleDriveListFilesOptionsOrderByKeys;
  order?: 'asc' | 'desc';
}

export type IGoogleDriveListFilesOptionsSpaceKeys =
  | 'drive'
  | 'appDataFolder'
  ;

export interface IGoogleDriveListFilesOptions extends Pick<IFetchGoogleAPIOptions, 'apiKey' | 'token'> {
  corpora?: IGoogleDriveListFilesOptionsCorporaKeys;
  driveId?: string;
  fields?: string;
  includeItemsFromAllDrives?: boolean;
  includePermissionsForView?: 'published';
  orderBy?: readonly IGoogleDriveListFilesOptionsOrderBy[];
  pageSize?: number;
  pageToken?: string;
  query?: string;
  spaces?: readonly IGoogleDriveListFilesOptionsSpaceKeys[];
  supportsAllDrives?: boolean;
}

export function googleDriveListFiles(
  {
    corpora,
    driveId,
    fields,
    includeItemsFromAllDrives,
    includePermissionsForView,
    orderBy,
    pageSize,
    pageToken,
    query,
    spaces,
    supportsAllDrives,
    ...options
  }: IGoogleDriveListFilesOptions,
): Promise<IGoogleDriveAPIFilesList> {
  const url: URL = new URL('https://www.googleapis.com/drive/v3/files');

  if (corpora !== void 0) {
    url.searchParams.set('corpora', corpora);
  }

  if (driveId !== void 0) {
    url.searchParams.set('driveId', driveId);
  }

  if (fields !== void 0) {
    url.searchParams.set('fields', fields);
  }

  if (includeItemsFromAllDrives !== void 0) {
    url.searchParams.set('includeItemsFromAllDrives', booleanToString(includeItemsFromAllDrives));
  }

  if (includePermissionsForView !== void 0) {
    url.searchParams.set('includePermissionsForView', includePermissionsForView);
  }

  if (orderBy !== void 0) {
    url.searchParams.set(
      'orderBy',
      arrayToString(
        orderBy
          .map(({ key, order }: IGoogleDriveListFilesOptionsOrderBy): string => {
            return `${key}${(order === 'desc') ? ' desc' : ''}`;
          }),
        ',',
      ),
    );
  }

  if (pageSize !== void 0) {
    url.searchParams.set('pageSize', numberToString(pageSize));
  }

  if (pageToken !== void 0) {
    url.searchParams.set('pageToken', pageToken);
  }

  if (query !== void 0) {
    url.searchParams.set('q', query);
  }

  if (spaces !== void 0) {
    url.searchParams.set('spaces', spaces.join(','));
  }

  if (supportsAllDrives !== void 0) {
    url.searchParams.set('supportsAllDrives', booleanToString(supportsAllDrives));
  }

  return fetchJSONGoogleAPI<IGoogleDriveAPIFilesList>({
    ...options,
    url,
  });
}


