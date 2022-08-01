import { IDefaultNotificationsUnion, IObservable } from '@lirx/core';
import { ensureURLIsSupportedAndCastToObservable } from '@uni-fs/core';
import { INFOMANIAK_DRIVE_FILE_SYSTEM_PROTOCOLS } from '../core/get-protocols/infomaniak-drive-file-system.protocols.constant';

export function infomaniakDriveProtocolGuard<GNextValue>(
  url: URL,
  callback: (url: URL) => IObservable<IDefaultNotificationsUnion<GNextValue>>,
): IObservable<IDefaultNotificationsUnion<GNextValue>> {
  return ensureURLIsSupportedAndCastToObservable(
    INFOMANIAK_DRIVE_FILE_SYSTEM_PROTOCOLS,
    url,
    callback,
  );
}
