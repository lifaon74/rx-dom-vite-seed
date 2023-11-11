import { createGoogleDriveFileSystemGetSchemesTrait } from './get-schemes/create-google-drive-file-system.get-schemes.trait';
import { IGoogleDriveFileSystemCore } from './google-drive-file-system.core.type';
import { ICreateGoogleDriveFileSystemListFunctionOptions } from './list/google-drive-file-system.list';
import { createGoogleDriveFileSystemListTrait } from './list/create-google-drive-file-system.list.trait';

export interface ICreateGoogleDriveFileSystemCoreOptions extends //
  ICreateGoogleDriveFileSystemListFunctionOptions
//
{
}

export function createGoogleDriveFileSystemCore(
  options: ICreateGoogleDriveFileSystemCoreOptions,
): IGoogleDriveFileSystemCore {
  return {
    ...createGoogleDriveFileSystemGetSchemesTrait(),
    ...createGoogleDriveFileSystemListTrait(options),
    // ...createGoogleDriveFileSystemReadTrait(options),
  } as any; // TODO
}
