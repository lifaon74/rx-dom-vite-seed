import { IFileSystemExtended } from '@uni-fs/core';
import { IGoogleDriveFileSystemMetadata } from '../shared/google-drive-file-system.metadata.type';
import { IGoogleDriveFileSystemSchemes } from '../shared/google-drive-file-system.schemes.constant';

export interface IGoogleDriveFileSystemExtended extends IFileSystemExtended<IGoogleDriveFileSystemSchemes, IGoogleDriveFileSystemMetadata> {

}
