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
import { INFOMANIAK_DRIVE_DEFAULT_SCOPE_CONSTANT } from '../../../../api/infomaniak/drive/infomaniak-drive-default-scope.constant';
import { infomaniakDriveListFiles } from '../../../../api/infomaniak/drive/list-files/infomaniak-drive-list-files';
import { IInfomaniakDriveAPIFile, IInfomaniakDriveAPIFilesList } from '../../../../api/infomaniak/drive/list-files/infomaniak-drive-list-files.interfaces';
import {
  wrapFunctionWithInfomaniakIdentityServiceTokenLoaderFull,
} from '../../../../api/infomaniak/wrap/wrap-function-with-infomaniak-identity-service-token-loader-full';
import { infomaniakDriveProtocolGuard } from '../../internal/infomaniak-drive-protocol-guard';
import { IInfomaniakDriveFileSystemMetadata } from '../metadata/infomaniak-drive-file-system.metadata.type';
import { IInfomaniakDriveFileSystemListConfig } from './infomaniak-drive-file-system.list.config';

/*---*/

export type IInfomaniakDriveFileSystemListFunctionNotifications = IFileSystemListFunctionNotifications<IInfomaniakDriveFileSystemListConfig>;

export interface ICreateInfomaniakDriveFileSystemListFunctionOptions {
  clientId: string;
  apiKey: string;
}

export function createInfomaniakDriveFileSystemListFunction(
  options: ICreateInfomaniakDriveFileSystemListFunctionOptions,
): IFileSystemListFunction<IInfomaniakDriveFileSystemListConfig> {
  return (
    url: URL,
    {
      withMetadata = false,
      search,
      inParents = [],
    }: IFileSystemListFunctionOptions = {},
  ): IObservable<IInfomaniakDriveFileSystemListFunctionNotifications> => {
    return infomaniakDriveProtocolGuard(url, (url: URL): IObservable<IInfomaniakDriveFileSystemListFunctionNotifications> => {
      const _inParents: string = (inParents.length === 0)
        ? 'root'
        : inParents.join(',');

      const infomaniakDriveListFilesOptions = {
        ...options,
        scope: INFOMANIAK_DRIVE_DEFAULT_SCOPE_CONSTANT,
        pageSize: 1000,
        // fields: '*',
        fields: 'files(id, name, createdTime, mimeType, modifiedTime, quotaBytesUsed, thumbnailLink), nextPageToken',
        // https://developers.infomaniak.com/drive/api/guides/search-files#node.js
        // https://developers.infomaniak.com/drive/api/guides/ref-search-terms
        query: `"${_inParents}" in parents and trashed = false${search === void 0 ? '' : ` and name contains ${search.replace('\'', '\\\\')}`}`,
      };

      const _infomaniakDriveListFiles = wrapFunctionWithInfomaniakIdentityServiceTokenLoaderFull(infomaniakDriveListFiles);

      const doRequest = (
        files: IInfomaniakDriveAPIFile[] = [],
        pageToken?: string,
      ): IObservable<IFromPromiseFactoryObservableNotifications<IInfomaniakDriveAPIFile[]>> => {
        return pipe$$(
          fromPromiseFactory<IInfomaniakDriveAPIFilesList>(() => {
            return _infomaniakDriveListFiles({
              ...infomaniakDriveListFilesOptions,
              pageToken,
            });
          }),
          [
            fulfilled$$$((data: IInfomaniakDriveAPIFilesList): IObservable<IFromPromiseFactoryObservableNotifications<IInfomaniakDriveAPIFile[]>> => {
              const _files: IInfomaniakDriveAPIFile[] = [...files, ...data.files];
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
          (files: IInfomaniakDriveAPIFile[]): IObservable<IInfomaniakDriveFileSystemListFunctionNotifications> => {
            return fromArrayN(
              files.map((child: IInfomaniakDriveAPIFile): IFileSystemEntryWithMetadata<IInfomaniakDriveFileSystemMetadata> => {
                // console.log(child);

                const childURL: URL = new URL(`${url.protocol}${child.id}`);

                const types: IFileSystemTypesSet = new Set<IFileSystemTypes>();
                if (child.mimeType === 'application/vnd.infomaniak-apps.folder') {
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

                const metadata: IInfomaniakDriveFileSystemMetadata | null = withMetadata
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
