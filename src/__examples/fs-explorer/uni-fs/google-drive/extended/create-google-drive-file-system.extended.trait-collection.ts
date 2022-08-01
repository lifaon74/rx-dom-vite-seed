import {
  createGoogleDriveFileSystemCoreTraitCollection,
  ICreateGoogleDriveFileSystemCoreTraitCollectionOptions,
} from '../core/create-google-drive-file-system.core.trait-collection';
import { IGoogleDriveFileSystemExtendedTraitCollection } from './google-drive-file-system.extended.trait-collection';

export interface ICreateGoogleDriveFileSystemExtendedTraitCollectionOptions extends //
  ICreateGoogleDriveFileSystemCoreTraitCollectionOptions
  //
{
}

export function createGoogleDriveFileSystemExtendedTraitCollection(
  options: ICreateGoogleDriveFileSystemExtendedTraitCollectionOptions,
): IGoogleDriveFileSystemExtendedTraitCollection {
  return {
    ...createGoogleDriveFileSystemCoreTraitCollection(options),
  } as any; // TODO
}
