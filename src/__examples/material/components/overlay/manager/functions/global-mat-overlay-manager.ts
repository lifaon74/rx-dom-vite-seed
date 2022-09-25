import { MatOverlayManager } from '../mat-overlay-manager';

let GLOBAL_MAT_OVERLAY_MANAGER: MatOverlayManager;


export function setGlobalMatOverlayManager(
  manager: MatOverlayManager,
): MatOverlayManager {
  if (globalMatOverlayManagerIsUndefined()) {
    GLOBAL_MAT_OVERLAY_MANAGER = manager;
    return manager;
  } else {
    throw new Error(`The global MatOverlayManager is already defined`);
  }
}

export function globalMatOverlayManagerIsUndefined(): boolean {
  return (GLOBAL_MAT_OVERLAY_MANAGER === void 0);
}

export function getGlobalMatOverlayManager(): MatOverlayManager {
  if (globalMatOverlayManagerIsUndefined()) {
    throw new Error(`The global MatOverlayManager is undefined`);
  } else {
    return GLOBAL_MAT_OVERLAY_MANAGER;
  }
}

export function setOptionallyGlobalMatOverlayManager(
  manager: MatOverlayManager,
): MatOverlayManager {
  if (globalMatOverlayManagerIsUndefined()) {
    GLOBAL_MAT_OVERLAY_MANAGER = manager;
  }
  return manager;
}

