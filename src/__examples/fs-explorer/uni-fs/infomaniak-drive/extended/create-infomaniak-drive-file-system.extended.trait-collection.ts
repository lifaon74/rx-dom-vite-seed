import {
  createInfomaniakDriveFileSystemCoreTraitCollection,
  ICreateInfomaniakDriveFileSystemCoreTraitCollectionOptions,
} from '../core/create-infomaniak-drive-file-system.core.trait-collection';
import { IInfomaniakDriveFileSystemExtendedTraitCollection } from './infomaniak-drive-file-system.extended.trait-collection';

export interface ICreateInfomaniakDriveFileSystemExtendedTraitCollectionOptions extends //
  ICreateInfomaniakDriveFileSystemCoreTraitCollectionOptions
  //
{
}

export function createInfomaniakDriveFileSystemExtendedTraitCollection(
  options: ICreateInfomaniakDriveFileSystemExtendedTraitCollectionOptions,
): IInfomaniakDriveFileSystemExtendedTraitCollection {
  return {
    ...createInfomaniakDriveFileSystemCoreTraitCollection(options),
  } as any; // TODO
}
