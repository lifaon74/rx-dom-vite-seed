import { googleDriveFileSystemGetMetadata } from './google-drive-file-system.get-metadata';
import { IFileSystemGetMetadataTrait } from '@uni-fs/core';
import { IGoogleDriveFileSystemMetadata } from '../../shared/google-drive-file-system.metadata.type';

export function createGoogleDriveFileSystemGetMetadataTrait(): IFileSystemGetMetadataTrait<IGoogleDriveFileSystemMetadata> {
  return {
    getMetadata: googleDriveFileSystemGetMetadata,
  };
}
