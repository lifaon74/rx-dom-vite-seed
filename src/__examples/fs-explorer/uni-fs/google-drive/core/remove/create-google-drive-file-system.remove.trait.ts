import { googleDriveFileSystemRemove } from './google-drive-file-system.remove';
import { IFileSystemRemoveTrait } from '../../../../../traits/core/entry/remove/file-system.remove.trait';

export function createGoogleDriveFileSystemRemoveTrait(): IFileSystemRemoveTrait {
  return {
    remove: googleDriveFileSystemRemove,
  };
}
