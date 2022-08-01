
import { IGoogleDriveFileSystemMetadata } from './google-drive-file-system.metadata.type';
import {
  fromPromise, IDefaultNotificationsUnion, IErrorNotification, IObservable, pipe$$, singleN, then$$$, throwError,
} from '@lirx/core';
import {
  ensureURLIsSupportedAndCastToPathObservable
} from '@uni-fs/core';
import { IFileSystemMetadataFunction } from '@uni-fs/core';
import {
  createEntityDoesntExistFileSystemError
} from '@uni-fs/core';

export type IGoogleDriveFileSystemMetadataFunctionNotifications = IDefaultNotificationsUnion<IGoogleDriveFileSystemMetadata>;

export const googleDriveFileSystemMetadata: IFileSystemMetadataFunction = function googleDriveFileSystemMetadata(
  url: URL,
): IObservable<IGoogleDriveFileSystemMetadataFunctionNotifications> {
  throw 'TODO';
  // return ensureURLIsSupportedAndCastToPathObservable(GOOGLE_DRIVE_FILE_SYSTEM_PROTOCOLS, url, (path: Path): IObservable<IGoogleDriveFileSystemMetadataFunctionNotifications> => {
  //   return pipe$$(fromPromise(lstat(path.toString())), [
  //     then$$$(
  //       (metadata: Metadata): IObservable<IGoogleDriveFileSystemMetadataFunctionNotifications> => {
  //         return singleN<IGoogleDriveFileSystemMetadata>({
  //           birthTime: metadata.birthtimeMs,
  //           accessTime: metadata.atimeMs,
  //           modificationTime: metadata.mtimeMs,
  //           creationTime: metadata.ctimeMs,
  //           size: metadata.size,
  //         });
  //       },
  //       (error: unknown): IObservable<IErrorNotification> => {
  //         if (isNodeJSError(error) && (error.code === 'ENOENT')) {
  //           return throwError(createEntityDoesntExistFileSystemError(url.toString()));
  //         } else {
  //           return throwError(error);
  //         }
  //       },
  //     ),
  //   ]);
  // });
};
