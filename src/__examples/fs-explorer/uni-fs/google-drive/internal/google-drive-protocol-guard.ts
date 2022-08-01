import { IDefaultNotificationsUnion, IObservable } from '@lirx/core';
import { ensureURLIsSupportedAndCastToObservable } from '@uni-fs/core';
import { GOOGLE_DRIVE_FILE_SYSTEM_PROTOCOLS } from '../core/get-protocols/google-drive-file-system.protocols.constant';

export function googleDriveProtocolGuard<GNextValue>(
  url: URL,
  callback: (url: URL) => IObservable<IDefaultNotificationsUnion<GNextValue>>,
): IObservable<IDefaultNotificationsUnion<GNextValue>> {
  return ensureURLIsSupportedAndCastToObservable(
    GOOGLE_DRIVE_FILE_SYSTEM_PROTOCOLS,
    url,
    callback,
  );
}
