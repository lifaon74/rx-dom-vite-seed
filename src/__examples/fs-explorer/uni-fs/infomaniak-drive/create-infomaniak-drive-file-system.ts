import {
  createInfomaniakDriveFileSystemExtendedTraitCollection,
  ICreateInfomaniakDriveFileSystemExtendedTraitCollectionOptions,
} from './extended/create-infomaniak-drive-file-system.extended.trait-collection';
import { IInfomaniakDriveFileSystemExtendedTraitCollection } from './extended/infomaniak-drive-file-system.extended.trait-collection';

export interface ICreateInfomaniakDriveFileSystemOptions extends ICreateInfomaniakDriveFileSystemExtendedTraitCollectionOptions {

}

export function createInfomaniakDriveFileSystem(
  options: ICreateInfomaniakDriveFileSystemOptions,
): IInfomaniakDriveFileSystemExtendedTraitCollection {
  return createInfomaniakDriveFileSystemExtendedTraitCollection(options);
}
