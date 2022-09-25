import { IPositionAndSize2D } from '../types/2d/position-and-size/position-and-size-2d.type';
import { ISize2D } from '../types/2d/size/size-2d.type';
import {
  getExternalBoxForContainerElementWithMargin, IGetExternalBoxForContainerElementWithMarginOptions
} from './get-external-box-for-container-element-with-margin';
import {
  getTargetBoxForTargetElementWithMargin, IGetTargetBoxForTargetElementWithMarginOptions
} from './get-target-box-for-target-element-with-margin';
import { fitBoxRelativeToTargetBoxWith$BottomLeft$TopLeftPreference } from './fit-box-relative-to-target-box';

export interface IGetPositionAndSizeObservableForSimpleOverlayAOptions extends
  //
  IGetExternalBoxForContainerElementWithMarginOptions,
  IGetTargetBoxForTargetElementWithMarginOptions
  //
{
  contentElementSize: ISize2D;
}

export function getFittingBoxForContainer$Target$ContentElements(
  {
    contentElementSize,
    ...options
  }: IGetPositionAndSizeObservableForSimpleOverlayAOptions,
): IPositionAndSize2D {
  return fitBoxRelativeToTargetBoxWith$BottomLeft$TopLeftPreference(
    getExternalBoxForContainerElementWithMargin(options),
    getTargetBoxForTargetElementWithMargin(options),
    contentElementSize,
  );
}
