import { IFileSystemGetProtocolsTrait } from '@uni-fs/core';
import { infomaniakDriveFileSystemGetProtocols } from './infomaniak-drive-file-system.get-protocols';
import { IInfomaniakDriveFileSystemGetProtocolsConfig } from './infomaniak-drive-file-system.get-protocols.config';

export function createInfomaniakDriveFileSystemGetProtocolsTrait(): IFileSystemGetProtocolsTrait<IInfomaniakDriveFileSystemGetProtocolsConfig> {
  return {
    getProtocols: infomaniakDriveFileSystemGetProtocols,
  };
}
