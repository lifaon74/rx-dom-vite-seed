import {
  fromArrayN,
  fromPromiseFactory,
  fulfilled$$$,
  IFromPromiseFactoryObservableNotifications,
  IObservable,
  pipe$$,
  singleN,
} from '@lirx/core';
import {
  IFileSystemEntryWithMetadata,
  IFileSystemListFunction,
  IFileSystemListFunctionNotifications,
  IFileSystemListFunctionOptions,
  IFileSystemTypes,
  IFileSystemTypesSet,
} from '@uni-fs/core';
import { GOOGLE_DRIVE_DEFAULT_SCOPE_CONSTANT } from '../../../../api/google/drive/google-drive-default-scope.constant';
import { googleDriveListFiles } from '../../../../api/google/drive/list-files/google-drive-list-files';
import { IGoogleDriveAPIFile, IGoogleDriveAPIFilesList } from '../../../../api/google/drive/list-files/google-drive-list-files.interfaces';
import {
  wrapFunctionWithGoogleIdentityServiceTokenLoaderFull,
} from '../../../../api/google/wrap/wrap-function-with-google-identity-service-token-loader-full';
import { googleDriveProtocolGuard } from '../../internal/google-drive-protocol-guard';
import { IGoogleDriveFileSystemMetadata } from '../metadata/google-drive-file-system.metadata.type';
import { IGoogleDriveFileSystemListConfig } from './google-drive-file-system.list.config';

/*---*/

export type IGoogleDriveFileSystemListFunctionNotifications = IFileSystemListFunctionNotifications<IGoogleDriveFileSystemListConfig>;

export interface ICreateGoogleDriveFileSystemListFunctionOptions {
  clientId: string;
  apiKey: string;
}

export function createGoogleDriveFileSystemListFunction(
  options: ICreateGoogleDriveFileSystemListFunctionOptions,
): IFileSystemListFunction<IGoogleDriveFileSystemListConfig> {
  return (
    url: URL,
    {
      withMetadata = false,
      search,
      inParents = [],
    }: IFileSystemListFunctionOptions = {},
  ): IObservable<IGoogleDriveFileSystemListFunctionNotifications> => {
    return googleDriveProtocolGuard(url, (url: URL): IObservable<IGoogleDriveFileSystemListFunctionNotifications> => {
      const _inParents: string = (inParents.length === 0)
        ? 'root'
        : inParents.join(',');

      const googleDriveListFilesOptions = {
        ...options,
        scope: GOOGLE_DRIVE_DEFAULT_SCOPE_CONSTANT,
        pageSize: 1000,
        // fields: '*',
        fields: 'files(id, name, createdTime, mimeType, modifiedTime, quotaBytesUsed, thumbnailLink), nextPageToken',
        // https://developers.google.com/drive/api/guides/search-files#node.js
        // https://developers.google.com/drive/api/guides/ref-search-terms
        query: `"${_inParents}" in parents and trashed = false${search === void 0 ? '' : ` and name contains ${search.replace('\'', '\\\\')}`}`,
      };

      const _googleDriveListFiles = wrapFunctionWithGoogleIdentityServiceTokenLoaderFull(googleDriveListFiles);

      const doRequest = (
        files: IGoogleDriveAPIFile[] = [],
        pageToken?: string,
      ): IObservable<IFromPromiseFactoryObservableNotifications<IGoogleDriveAPIFile[]>> => {
        return pipe$$(
          fromPromiseFactory<IGoogleDriveAPIFilesList>(() => {
            return _googleDriveListFiles({
              ...googleDriveListFilesOptions,
              pageToken,
            });
          }),
          [
            fulfilled$$$((data: IGoogleDriveAPIFilesList): IObservable<IFromPromiseFactoryObservableNotifications<IGoogleDriveAPIFile[]>> => {
              const _files: IGoogleDriveAPIFile[] = [...files, ...data.files];
              if (data.nextPageToken) {
                return doRequest(
                  _files,
                  data.nextPageToken,
                );
              } else {
                return singleN(_files);
              }
            }),
          ],
        );
      };

      const request$ = doRequest();

      return pipe$$(request$, [
        fulfilled$$$(
          (files: IGoogleDriveAPIFile[]): IObservable<IGoogleDriveFileSystemListFunctionNotifications> => {
            return fromArrayN(
              files.map((child: IGoogleDriveAPIFile): IFileSystemEntryWithMetadata<IGoogleDriveFileSystemMetadata> => {
                // console.log(child);

                const childURL: URL = new URL(`${url.protocol}${child.id}`);

                const types: IFileSystemTypesSet = new Set<IFileSystemTypes>();
                if (child.mimeType === 'application/vnd.google-apps.folder') {
                  types.add('directory');
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

                const metadata: IGoogleDriveFileSystemMetadata | null = withMetadata
                  ? {
                    types,
                    name,
                    birthTime,
                    mimeType,
                    modificationTime,
                    size,
                    thumbnailLink,
                  }
                  : null;

                return {
                  url: childURL,
                  metadata,
                };
              }),
            );
          },
        ),
      ]);
    });
  };
}
