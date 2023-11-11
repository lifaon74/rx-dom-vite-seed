import { IFileSystemGetSchemesFunction } from '@uni-fs/core';
import { GOOGLE_DRIVE_FILE_SYSTEM_SCHEMES, IGoogleDriveFileSystemSchemes } from '../../shared/google-drive-file-system.schemes.constant';

export const googleDriveFileSystemGetSchemes: IFileSystemGetSchemesFunction<IGoogleDriveFileSystemSchemes> = function googleDriveFileSystemGetSchemes(): ReadonlySet<IGoogleDriveFileSystemSchemes> {
  return GOOGLE_DRIVE_FILE_SYSTEM_SCHEMES;
};
