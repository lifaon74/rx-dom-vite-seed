import { IObservable } from '@lirx/core';
import { getContentElementNaturalSize } from '../../../helpers/get-content-element-natural-size';
import {
  getCSSPositionAndSize2DObservableForStickyOverlayNearTargetElement,
  IContentElementSizeOptions, IGetCSSPositionAndSize2DObservableForStickyOverlayNearTargetElementOptions,
} from '../../../helpers/get-css-position-and-size-2d-observable-for-sticky-overlay-near-target-element';
import { ICSSPositionAndSize2D } from '../../../types/2d/position-and-size/css/css-position-and-size-2d.type';

export interface IGetCSSPositionAndSize2DObservableForMatOverlayBoxStickyOptions extends //
  Pick<IGetCSSPositionAndSize2DObservableForStickyOverlayNearTargetElementOptions, 'contentElement' | 'targetElement'>,
  Partial<Pick<IGetCSSPositionAndSize2DObservableForStickyOverlayNearTargetElementOptions, 'containerHorizontalMargin' | 'containerVerticalMargin'>>
//
{

}

export function getCSSPositionAndSize2DObservableForMatOverlayBoxSticky(
  {
    containerHorizontalMargin = 5,
    containerVerticalMargin = 5,
    ...options
  }: IGetCSSPositionAndSize2DObservableForMatOverlayBoxStickyOptions,
): IObservable<ICSSPositionAndSize2D> {
  return getCSSPositionAndSize2DObservableForStickyOverlayNearTargetElement({
    ...options,
    containerHorizontalMargin,
    containerVerticalMargin,
    getContentElementSize: (
      {
        contentElement,
      }: IContentElementSizeOptions,
    ) => {
      return getContentElementNaturalSize({
        contentElement,
        containerHorizontalMargin,
        containerVerticalMargin,
      });
    },
  });
}

