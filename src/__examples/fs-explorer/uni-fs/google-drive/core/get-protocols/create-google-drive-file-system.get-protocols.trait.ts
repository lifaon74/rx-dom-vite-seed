import { IFileSystemGetProtocolsTrait } from '@uni-fs/core';
import { googleDriveFileSystemGetProtocols } from './google-drive-file-system.get-protocols';
import { IGoogleDriveFileSystemGetProtocolsConfig } from './google-drive-file-system.get-protocols.config';

export function createGoogleDriveFileSystemGetProtocolsTrait(): IFileSystemGetProtocolsTrait<IGoogleDriveFileSystemGetProtocolsConfig> {
  return {
    getProtocols: googleDriveFileSystemGetProtocols,
  };
}
