import { IFileSystemGetProtocolsFunction } from '@uni-fs/core';
import { IInfomaniakDriveFileSystemGetProtocolsConfig } from './infomaniak-drive-file-system.get-protocols.config';
import { INFOMANIAK_DRIVE_FILE_SYSTEM_PROTOCOLS, IInfomaniakDriveFileSystemProtocols } from './infomaniak-drive-file-system.protocols.constant';

export const infomaniakDriveFileSystemGetProtocols: IFileSystemGetProtocolsFunction<IInfomaniakDriveFileSystemGetProtocolsConfig> = function infomaniakDriveFileSystemGetProtocols(): ReadonlySet<IInfomaniakDriveFileSystemProtocols> {
  return INFOMANIAK_DRIVE_FILE_SYSTEM_PROTOCOLS;
};
