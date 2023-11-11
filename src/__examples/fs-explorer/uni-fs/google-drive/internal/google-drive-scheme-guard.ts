import { ensureUriIsSupportedAndCastToUriAsyncTask, IURI } from '@uni-fs/core';
import { GOOGLE_DRIVE_FILE_SYSTEM_SCHEMES } from '../shared/google-drive-file-system.schemes.constant';
import { Abortable, IAsyncTaskInput, AsyncTask } from '@lirx/async-task';
import { IAsyncTaskConstraint } from '@lirx/async-task';

export function googleDriveSchemeGuard<GValue extends IAsyncTaskConstraint<GValue>>(
  uri: string,
  callback: (uri: IURI, abortable: Abortable) => IAsyncTaskInput<GValue>,
  abortable: Abortable,
): AsyncTask<GValue> {
  return ensureUriIsSupportedAndCastToUriAsyncTask<GValue>(
    GOOGLE_DRIVE_FILE_SYSTEM_SCHEMES,
    uri,
    callback,
    abortable,
  );
}
