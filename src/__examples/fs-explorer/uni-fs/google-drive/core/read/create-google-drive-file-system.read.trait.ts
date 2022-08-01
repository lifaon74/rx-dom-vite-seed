import { IFileSystemReadTrait } from '@uni-fs/core';
import { createGoogleDriveFileSystemReadFunction, ICreateGoogleDriveFileSystemReadFunctionOptions } from './google-drive-file-system.read';

export function createGoogleDriveFileSystemReadTrait(
  options: ICreateGoogleDriveFileSystemReadFunctionOptions,
): IFileSystemReadTrait {
  return {
    read: createGoogleDriveFileSystemReadFunction(options),
  };
}
