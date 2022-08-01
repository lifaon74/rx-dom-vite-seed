import {
  createGoogleDriveFileSystemExtendedTraitCollection,
  ICreateGoogleDriveFileSystemExtendedTraitCollectionOptions,
} from './extended/create-google-drive-file-system.extended.trait-collection';
import { IGoogleDriveFileSystemExtendedTraitCollection } from './extended/google-drive-file-system.extended.trait-collection';

export interface ICreateGoogleDriveFileSystemOptions extends ICreateGoogleDriveFileSystemExtendedTraitCollectionOptions {

}

export function createGoogleDriveFileSystem(
  options: ICreateGoogleDriveFileSystemOptions,
): IGoogleDriveFileSystemExtendedTraitCollection {
  return createGoogleDriveFileSystemExtendedTraitCollection(options);
}
