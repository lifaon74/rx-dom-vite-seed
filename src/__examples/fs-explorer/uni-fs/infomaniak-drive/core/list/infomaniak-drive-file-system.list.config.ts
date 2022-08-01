import { IFileSystemListConfig } from '@uni-fs/core';
import { IInfomaniakDriveFileSystemMetadata } from '../metadata/infomaniak-drive-file-system.metadata.type';

export interface IInfomaniakDriveFileSystemListConfig extends IFileSystemListConfig {
  metadata: IInfomaniakDriveFileSystemMetadata;
}
