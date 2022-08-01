import { IFileSystemMetadata } from '@uni-fs/core';

export interface IGoogleDriveFileSystemMetadata extends IFileSystemMetadata {
  mimeType: string;
  modificationTime: number;
  size: number;
  thumbnailLink?: string;
}
