import { Path } from '@lifaon/path';
import { IObservable } from '@lirx/core';
import {
  ensureURLIsSupportedAndCastToPathObservable,
  IFileSystemWriteFunction,
  IFileSystemWriteFunctionNotifications,
  IFileSystemWriteOptions,
} from '@uni-fs/core';
import { GOOGLE_DRIVE_FILE_SYSTEM_SCHEMES } from '../../shared/google-drive-file-system.schemes.constant';

export const googleDriveFileSystemWrite: IFileSystemWriteFunction = function googleDriveFileSystemWrite(
  url: URL,
  buffer: Uint8Array,
  {
    start,
    truncateMode,
  }: IFileSystemWriteOptions = {},
): IObservable<IFileSystemWriteFunctionNotifications> {
  return ensureURLIsSupportedAndCastToPathObservable(GOOGLE_DRIVE_FILE_SYSTEM_SCHEMES, url, (path: Path): IObservable<IFileSystemWriteFunctionNotifications> => {
    return writeFile(path, buffer, truncateMode, 0o0777, start);
  });
};

