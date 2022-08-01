import { IFileSystemGetProtocolsFunction } from '@uni-fs/core';
import { IGoogleDriveFileSystemGetProtocolsConfig } from './google-drive-file-system.get-protocols.config';
import { GOOGLE_DRIVE_FILE_SYSTEM_PROTOCOLS, IGoogleDriveFileSystemProtocols } from './google-drive-file-system.protocols.constant';

export const googleDriveFileSystemGetProtocols: IFileSystemGetProtocolsFunction<IGoogleDriveFileSystemGetProtocolsConfig> = function googleDriveFileSystemGetProtocols(): ReadonlySet<IGoogleDriveFileSystemProtocols> {
  return GOOGLE_DRIVE_FILE_SYSTEM_PROTOCOLS;
};
