import { createGoogleDriveFileSystemGetProtocolsTrait } from './get-protocols/create-google-drive-file-system.get-protocols.trait';
import { IGoogleDriveFileSystemCoreTraitCollection } from './google-drive-file-system.core.trait-collection';
import { createGoogleDriveFileSystemListTrait } from './list/create-google-drive-file-system.list.trait';
import { ICreateGoogleDriveFileSystemListFunctionOptions } from './list/google-drive-file-system.list';
import { createGoogleDriveFileSystemReadTrait } from './read/create-google-drive-file-system.read.trait';

export interface ICreateGoogleDriveFileSystemCoreTraitCollectionOptions extends //
  ICreateGoogleDriveFileSystemListFunctionOptions
//
{
}

export function createGoogleDriveFileSystemCoreTraitCollection(
  options: ICreateGoogleDriveFileSystemCoreTraitCollectionOptions,
): IGoogleDriveFileSystemCoreTraitCollection {
  return {
    ...createGoogleDriveFileSystemGetProtocolsTrait(),
    ...createGoogleDriveFileSystemListTrait(options),
    ...createGoogleDriveFileSystemReadTrait(options),
  } as any; // TODO
}
