import { IGoogleDriveFileSystemMetadata } from '../../shared/google-drive-file-system.metadata.type';
import { IFileSystemMetadataFunction } from '@uni-fs/core';
import { AsyncTask } from '@lirx/async-task';
import {
  IFileSystemGetMetadataOptions,
} from '@uni-fs/core';

export const googleDriveFileSystemGetMetadata: IFileSystemMetadataFunction<IGoogleDriveFileSystemMetadata> = function googleDriveFileSystemGetMetadata(
  url: URL,
  options?: IFileSystemGetMetadataOptions,
): AsyncTask<IGoogleDriveFileSystemMetadata> {
  throw 'TODO';
  // return ensureURLIsSupportedAndCastToPathObservable(GOOGLE_DRIVE_FILE_SYSTEM_SCHEMES, url, (path: Path): IObservable<IGoogleDriveFileSystemMetadataFunctionNotifications> => {
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
