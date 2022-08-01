import { googleDriveFileSystemWrite } from './google-drive-file-system.write';
import { IFileSystemWriteTrait } from '@uni-fs/core';

export function createGoogleDriveFileSystemWriteTrait(): IFileSystemWriteTrait {
  return {
    write: googleDriveFileSystemWrite,
  };
}
