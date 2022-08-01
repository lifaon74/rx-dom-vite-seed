export interface IGoogleDriveAPIFileUser {
  displayName: string;
  emailAddress: string;
  kind: string;
  me: boolean;
  permissionId: string;
  photoLink: string;
}

export interface IGoogleDriveAPIFileCapabilities {
  canAcceptOwnership: boolean;
  canAddChildren: boolean;
  canAddMyDriveParent: boolean;
  canChangeCopyRequiresWriterPermission: boolean;
  canChangeSecurityUpdateEnabled: boolean;
  canChangeViewersCanCopyContent: boolean;
  canComment: boolean;
  canCopy: boolean;
  canDelete: boolean;
  canDownload: boolean;
  canEdit: boolean;
  canListChildren: boolean;
  canModifyContent: boolean;
  canMoveChildrenWithinDrive: boolean;
  canMoveItemIntoTeamDrive: boolean;
  canMoveItemOutOfDrive: boolean;
  canMoveItemWithinDrive: boolean;
  canReadRevisions: boolean;
  canRemoveChildren: boolean;
  canRemoveMyDriveParent: boolean;
  canRename: boolean;
  canShare: boolean;
  canTrash: boolean;
  canUntrash: boolean;
}

export interface IGoogleDriveAPIFileLinkShareMetadata {
  securityUpdateEligible: boolean;
  securityUpdateEnabled: boolean;
}

export interface IGoogleDriveAPIFileImageMediaMetadata {
  cameraMake: string;
  cameraModel: string;
  colorSpace: string;
  height: number;
  rotation: number;
  width: number;
}

export interface IGoogleDriveAPIFilePermission {
  deleted: boolean;
  displayName: string;
  emailAddress: string;
  id: string;
  kind: string;
  pendingOwner: boolean;
  photoLink: string;
  role: string;
  type: string;
}

export interface IGoogleDriveAPIFile {
  capabilities: IGoogleDriveAPIFileCapabilities,
  copyRequiresWriterPermission: boolean;
  createdTime: string;
  explicitlyTrashed: boolean;
  folderColorRgb?: string; // folder
  fileExtension?: string; // file
  fullFileExtension?: string; // file
  hasThumbnail: boolean;
  headRevisionId?: string;
  iconLink: string;
  id: string;
  imageMediaMetadata?: IGoogleDriveAPIFileImageMediaMetadata;
  isAppAuthorized: boolean;
  kind: string;
  lastModifyingUser: IGoogleDriveAPIFileUser,
  linkShareMetadata: IGoogleDriveAPIFileLinkShareMetadata;
  md5Checksum?: string; // file
  mimeType: string;
  modifiedByMe: boolean;
  modifiedByMeTime?: string;
  modifiedTime: string;
  name: string;
  originalFilename?: string; // file
  ownedByMe: boolean;
  owners: IGoogleDriveAPIFileUser[],
  parents: string[],
  permissions: IGoogleDriveAPIFilePermission[],
  quotaBytesUsed: string;
  resourceKey?: string;
  shared: boolean;
  sharedWithMeTime?: string;
  size: string;
  spaces: ['drive'];
  starred: boolean;
  thumbnailLink?: string; // file
  thumbnailVersion: string;
  trashed: boolean;
  version: string;
  viewedByMe: boolean;
  viewedByMeTime: string;
  viewersCanCopyContent: boolean;
  webContentLink?: string; // file
  webViewLink: string;
  writersCanShare: boolean;
}

export interface IGoogleDriveAPIFilesList {
  files: IGoogleDriveAPIFile[];
  incompleteSearch: boolean;
  kind: string;
  nextPageToken: string;
}
