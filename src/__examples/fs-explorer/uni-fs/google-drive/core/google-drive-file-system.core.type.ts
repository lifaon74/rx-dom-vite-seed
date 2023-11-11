import { IGoogleDriveFileSystemSchemes } from '../shared/google-drive-file-system.schemes.constant';
import { IFileSystemCore } from '@uni-fs/core';
import { IGoogleDriveFileSystemMetadata } from '../shared/google-drive-file-system.metadata.type';

export interface IGoogleDriveFileSystemCore extends IFileSystemCore<IGoogleDriveFileSystemSchemes, IGoogleDriveFileSystemMetadata> {

}
