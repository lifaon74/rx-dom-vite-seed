import { IFileSystemExtendedTraitCollection } from '@uni-fs/core';
import { IGoogleDriveFileSystemMetadata } from '../core/metadata/google-drive-file-system.metadata.type';
import { IGoogleDriveFileSystemProtocols } from '../core/get-protocols/google-drive-file-system.protocols.constant';

export interface IGoogleDriveFileSystemExtendedTraitCollectionConfig {
  protocols: IGoogleDriveFileSystemProtocols;
  metadata: IGoogleDriveFileSystemMetadata;
}

export interface IGoogleDriveFileSystemExtendedTraitCollection extends IFileSystemExtendedTraitCollection<IGoogleDriveFileSystemExtendedTraitCollectionConfig> {

}
