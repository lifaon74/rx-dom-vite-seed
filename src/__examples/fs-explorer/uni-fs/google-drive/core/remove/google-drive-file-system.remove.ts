import { Path } from '@lifaon/path';
import { fulfilled$$$, IObservable, pipe$$, singleN } from '@lirx/core';
import {
  ensureURLIsSupportedAndCastToPathObservable,
  IFileSystemRemoveFunction,
  IFileSystemRemoveFunctionNotifications,
} from '@uni-fs/core';
import { GOOGLE_DRIVE_FILE_SYSTEM_SCHEMES } from '../../shared/google-drive-file-system.schemes.constant';

export const googleDriveFileSystemRemove: IFileSystemRemoveFunction = function googleDriveFileSystemRemove(
  url: URL,
): IObservable<IFileSystemRemoveFunctionNotifications> {
  return ensureURLIsSupportedAndCastToPathObservable(GOOGLE_DRIVE_FILE_SYSTEM_SCHEMES, url, (path: Path): IObservable<IFileSystemRemoveFunctionNotifications> => {
    return pipe$$(removeEntry(path), [
      fulfilled$$$((): IObservable<IFileSystemRemoveFunctionNotifications> => singleN(url)),
    ]);
  });
};

