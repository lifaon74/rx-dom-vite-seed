import { IFileSystemExtendedTraitCollection } from '@uni-fs/core';
import { IInfomaniakDriveFileSystemMetadata } from '../core/metadata/infomaniak-drive-file-system.metadata.type';
import { IInfomaniakDriveFileSystemProtocols } from '../core/get-protocols/infomaniak-drive-file-system.protocols.constant';

export interface IInfomaniakDriveFileSystemExtendedTraitCollectionConfig {
  protocols: IInfomaniakDriveFileSystemProtocols;
  metadata: IInfomaniakDriveFileSystemMetadata;
}

export interface IInfomaniakDriveFileSystemExtendedTraitCollection extends IFileSystemExtendedTraitCollection<IInfomaniakDriveFileSystemExtendedTraitCollectionConfig> {

}
