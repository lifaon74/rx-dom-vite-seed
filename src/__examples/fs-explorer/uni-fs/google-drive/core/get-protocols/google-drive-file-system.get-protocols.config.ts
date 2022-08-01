import { IFileSystemGetProtocolsConfig } from '@uni-fs/core';
import { IGoogleDriveFileSystemProtocols } from './google-drive-file-system.protocols.constant';

export interface IGoogleDriveFileSystemGetProtocolsConfig extends IFileSystemGetProtocolsConfig {
  protocols: IGoogleDriveFileSystemProtocols;
}
