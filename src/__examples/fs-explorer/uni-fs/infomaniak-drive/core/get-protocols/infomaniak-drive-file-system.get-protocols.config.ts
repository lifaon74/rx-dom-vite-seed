import { IFileSystemGetProtocolsConfig } from '@uni-fs/core';
import { IInfomaniakDriveFileSystemProtocols } from './infomaniak-drive-file-system.protocols.constant';

export interface IInfomaniakDriveFileSystemGetProtocolsConfig extends IFileSystemGetProtocolsConfig {
  protocols: IInfomaniakDriveFileSystemProtocols;
}
