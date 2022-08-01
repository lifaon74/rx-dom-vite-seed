import { IFileSystemListTrait } from '@uni-fs/core';
import { createInfomaniakDriveFileSystemListFunction, ICreateInfomaniakDriveFileSystemListFunctionOptions } from './infomaniak-drive-file-system.list';
import { IInfomaniakDriveFileSystemListConfig } from './infomaniak-drive-file-system.list.config';

export function createInfomaniakDriveFileSystemListTrait(
  options: ICreateInfomaniakDriveFileSystemListFunctionOptions,
): IFileSystemListTrait<IInfomaniakDriveFileSystemListConfig> {
  return {
    list: createInfomaniakDriveFileSystemListFunction(options),
  };
}
