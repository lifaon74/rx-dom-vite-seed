import {IFileSystemGetSchemesTrait} from '@uni-fs/core';
import {googleDriveFileSystemGetSchemes} from './google-drive-file-system.get-schemes';
import {IGoogleDriveFileSystemSchemes} from "../../shared/google-drive-file-system.schemes.constant";

export function createGoogleDriveFileSystemGetSchemesTrait(): IFileSystemGetSchemesTrait<IGoogleDriveFileSystemSchemes> {
  return {
    getSchemes: googleDriveFileSystemGetSchemes,
  };
}
