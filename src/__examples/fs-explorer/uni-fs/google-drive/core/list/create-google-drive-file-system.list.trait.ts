import { IFileSystemListTrait } from '@uni-fs/core';
import { createGoogleDriveFileSystemListFunction, ICreateGoogleDriveFileSystemListFunctionOptions } from './google-drive-file-system.list';
import { IGoogleDriveFileSystemMetadata } from '../../shared/google-drive-file-system.metadata.type';

export function createGoogleDriveFileSystemListTrait(
  options: ICreateGoogleDriveFileSystemListFunctionOptions,
): IFileSystemListTrait<IGoogleDriveFileSystemMetadata> {
  return {
    list: createGoogleDriveFileSystemListFunction(options),
  };
}
