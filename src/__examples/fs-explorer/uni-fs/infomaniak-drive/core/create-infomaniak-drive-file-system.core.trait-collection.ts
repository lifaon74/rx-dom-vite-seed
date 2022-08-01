import { createInfomaniakDriveFileSystemGetProtocolsTrait } from './get-protocols/create-infomaniak-drive-file-system.get-protocols.trait';
import { IInfomaniakDriveFileSystemCoreTraitCollection } from './infomaniak-drive-file-system.core.trait-collection';
import { createInfomaniakDriveFileSystemListTrait } from './list/create-infomaniak-drive-file-system.list.trait';
import { ICreateInfomaniakDriveFileSystemListFunctionOptions } from './list/infomaniak-drive-file-system.list';
import { createInfomaniakDriveFileSystemReadTrait } from './read/create-infomaniak-drive-file-system.read.trait';

export interface ICreateInfomaniakDriveFileSystemCoreTraitCollectionOptions extends //
  ICreateInfomaniakDriveFileSystemListFunctionOptions
//
{
}

export function createInfomaniakDriveFileSystemCoreTraitCollection(
  options: ICreateInfomaniakDriveFileSystemCoreTraitCollectionOptions,
): IInfomaniakDriveFileSystemCoreTraitCollection {
  return {
    ...createInfomaniakDriveFileSystemGetProtocolsTrait(),
    ...createInfomaniakDriveFileSystemListTrait(options),
    ...createInfomaniakDriveFileSystemReadTrait(options),
  } as any; // TODO
}
