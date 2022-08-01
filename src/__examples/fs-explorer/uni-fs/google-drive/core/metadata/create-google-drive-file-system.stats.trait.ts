import { googleDriveFileSystemMetadata } from './google-drive-file-system.metadata';
import { IFileSystemMetadataTrait } from '../../../../../traits/core/entry/metadata/file-system.metadata.trait';

export function createGoogleDriveFileSystemMetadataTrait(): IFileSystemMetadataTrait {
  return {
    metadata: googleDriveFileSystemMetadata,
  };
}
