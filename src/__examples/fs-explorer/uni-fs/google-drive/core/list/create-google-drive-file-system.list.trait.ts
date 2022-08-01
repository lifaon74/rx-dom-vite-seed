import { IFileSystemListTrait } from '@uni-fs/core';
import { createGoogleDriveFileSystemListFunction, ICreateGoogleDriveFileSystemListFunctionOptions } from './google-drive-file-system.list';
import { IGoogleDriveFileSystemListConfig } from './google-drive-file-system.list.config';

export function createGoogleDriveFileSystemListTrait(
  options: ICreateGoogleDriveFileSystemListFunctionOptions,
): IFileSystemListTrait<IGoogleDriveFileSystemListConfig> {
  return {
    list: createGoogleDriveFileSystemListFunction(options),
  };
}
