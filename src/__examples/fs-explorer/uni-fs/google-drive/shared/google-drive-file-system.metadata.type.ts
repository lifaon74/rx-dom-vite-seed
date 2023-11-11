import { IFileSystemMetadata } from '@uni-fs/core';

export interface IGoogleDriveFileSystemMetadata extends IFileSystemMetadata {
  readonly mimeType: string;
  readonly modificationTime: number;
  readonly size: number;
  readonly thumbnailLink?: string;
}
