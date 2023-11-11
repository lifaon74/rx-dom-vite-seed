import { createGoogleDriveFileSystemCore, ICreateGoogleDriveFileSystemCoreOptions } from '../core/create-google-drive-file-system.core';
import { IGoogleDriveFileSystemExtended } from './google-drive-file-system.extended.type';

export interface ICreateGoogleDriveFileSystemExtendedOptions extends //
  ICreateGoogleDriveFileSystemCoreOptions
  //
{
}

export function createGoogleDriveFileSystemExtended(
  options: ICreateGoogleDriveFileSystemExtendedOptions,
): IGoogleDriveFileSystemExtended {
  return {
    ...createGoogleDriveFileSystemCore(options),
  } as any; // TODO
}
