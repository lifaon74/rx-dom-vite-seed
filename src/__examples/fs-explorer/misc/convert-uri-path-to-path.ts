import { IURI } from '@uni-fs/core';
import { Path } from '@lifaon/path';

export function convertURIPathToPath(
  uri: IURI,
): Path {
  return new Path(
    uri.path.startsWith('/')
      ? uri.path
      : `/${uri.path}`,
    Path.posix,
  );
}
