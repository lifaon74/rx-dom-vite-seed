import { IFileSystemListConfig } from '@uni-fs/core';
import { IGoogleDriveFileSystemMetadata } from '../metadata/google-drive-file-system.metadata.type';

export interface IGoogleDriveFileSystemListConfig extends IFileSystemListConfig {
  metadata: IGoogleDriveFileSystemMetadata;
}
