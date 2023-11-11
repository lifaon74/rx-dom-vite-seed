import {
  createGoogleDriveFileSystemExtended,
  ICreateGoogleDriveFileSystemExtendedOptions,
} from './extended/create-google-drive-file-system.extended';
import { IGoogleDriveFileSystemExtended } from './extended/google-drive-file-system.extended.type';

export interface ICreateGoogleDriveFileSystemOptions extends ICreateGoogleDriveFileSystemExtendedOptions {

}

export function createGoogleDriveFileSystem(
  options: ICreateGoogleDriveFileSystemOptions,
): IGoogleDriveFileSystemExtended {
  return createGoogleDriveFileSystemExtended(options);
}
