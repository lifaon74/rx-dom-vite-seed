import {
  IFileSystemEntryWithMetadata,
  IFileSystemListFunction,
  IFileSystemListOptions,
  IFileSystemTypes,
  IURI,
  serializeURI,
} from '@uni-fs/core';
import { GOOGLE_DRIVE_DEFAULT_SCOPE_CONSTANT } from '../../../../api/google/drive/google-drive-default-scope.constant';
import { googleDriveListAllFiles } from '../../../../api/google/drive/list-files/google-drive-list-files';
import { IGoogleDriveAPIFile } from '../../../../api/google/drive/list-files/google-drive-list-files.interfaces';
import {
  runFunctionWithGoogleIdentityServiceTokenLoader,
} from '../../../../api/google/wrap/wrap-function-with-google-identity-service-token-loader';
import { googleDriveSchemeGuard } from '../../internal/google-drive-scheme-guard';
import { IGoogleDriveFileSystemMetadata } from '../../shared/google-drive-file-system.metadata.type';
import { AsyncTask, Abortable, IAsyncTaskInput } from '@lirx/async-task';
import { Path } from '@lifaon/path';
import { convertURIPathToPath } from '../../../../misc/convert-uri-path-to-path';

/*---*/

export interface ICreateGoogleDriveFileSystemListFunctionOptions {
  readonly clientId: string;
  readonly apiKey: string;
}

export function createGoogleDriveFileSystemListFunction(
  options: ICreateGoogleDriveFileSystemListFunctionOptions,
): IFileSystemListFunction<IGoogleDriveFileSystemMetadata> {
  return (
    {
      uri,
      withMetadata = false,
      search,
      abortable,
    }: IFileSystemListOptions,
  ): AsyncTask<readonly IFileSystemEntryWithMetadata<IGoogleDriveFileSystemMetadata>[]> => {
    return googleDriveSchemeGuard(uri, (uri: IURI, abortable: Abortable): IAsyncTaskInput<readonly IFileSystemEntryWithMetadata<IGoogleDriveFileSystemMetadata>[]> => {

      const path: Path = convertURIPathToPath(uri);

      const id: string = path.isRoot()
        ? 'root'
        : path.segments[path.segments.length - 1];

      return runFunctionWithGoogleIdentityServiceTokenLoader(googleDriveListAllFiles, {
        ...options,
        scope: GOOGLE_DRIVE_DEFAULT_SCOPE_CONSTANT,
        pageSize: 1000,
        fields: '*',
        // fields: 'files(id, name, createdTime, mimeType, modifiedTime, quotaBytesUsed, thumbnailLink), nextPageToken',
        // https://developers.google.com/drive/api/guides/search-files#node.js
        // https://developers.google.com/drive/api/guides/ref-search-terms
        query: `"${id}" in parents and trashed = false${search === void 0 ? '' : ` and name contains ${search.replace('\'', '\\\\')}`}`,
        abortable,
      })
        .successful((files: IGoogleDriveAPIFile[]): readonly IFileSystemEntryWithMetadata<IGoogleDriveFileSystemMetadata>[] => {
          return files.map((child: IGoogleDriveAPIFile): IFileSystemEntryWithMetadata<IGoogleDriveFileSystemMetadata> => {
            // console.log(child);

            // `${uri.scheme}${JSON.stringify([...path, child.id])}`
            const childURI: IURI = {
              ...uri,
              path: path.concat(child.id).toString(),
            };

            const types = new Set<IFileSystemTypes>();

            if (child.mimeType === 'application/vnd.google-apps.folder') {
              types.add('collection');
            }

            if ('thumbnailLink' in child) {
              types.add('file');
            }

            const name: string = child.name;
            const birthTime: number = Date.parse(child.createdTime);
            const mimeType: string = child.mimeType;
            const modificationTime: number = Date.parse(child.modifiedTime);
            const size: number = Number(child.quotaBytesUsed);
            const thumbnailLink: string | undefined = child.thumbnailLink;

            const metadata: IGoogleDriveFileSystemMetadata | undefined = withMetadata
              ? {
                types,
                name,
                birthTime,
                mimeType,
                modificationTime,
                size,
                thumbnailLink,
              }
              : void 0;

            return {
              uri: serializeURI(childURI),
              metadata,
            };
          });
        });
    }, abortable);
  };
}
