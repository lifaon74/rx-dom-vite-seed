import { defer, fromResizeObserver, interval, IObservable, map$$, merge } from '@lirx/core';
import { ICSSPositionAndSize2D } from '../types/2d/position-and-size/css/css-position-and-size-2d.type';
import { positionAndSize2DToCSSPositionAndSize2D } from '../types/2d/position-and-size/css/position-and-size-2d-to-css-position-and-size-2d';
import { getElementPositionAndSize2D } from '../types/2d/position-and-size/get-element-position-and-size-2d';
import { IPositionAndSize2D } from '../types/2d/position-and-size/position-and-size-2d.type';
import { ISize2D } from '../types/2d/size/size-2d.type';
import { IGetExternalBoxForContainerElementWithMarginOptions } from './get-external-box-for-container-element-with-margin';
import { getFittingBoxForContainer$Target$ContentElements } from './get-fitting-box-for-container-target-content-elements';
import { IGetTargetBoxForTargetElementWithMarginOptions } from './get-target-box-for-target-element-with-margin';


export interface IGetContentElementSizeFunction {
  (
    options: IContentElementSizeOptions,
  ): ISize2D;
}

export interface IContentElementSizeOptions {
  contentElement: HTMLElement;
  containerElementPositionAndSize: IPositionAndSize2D;
  targetElementPositionAndSize: IPositionAndSize2D;
}

export interface IGetCSSPositionAndSize2DObservableForStickyOverlayNearTargetElementOptions extends //
  Pick<IGetExternalBoxForContainerElementWithMarginOptions, 'containerHorizontalMargin' | 'containerVerticalMargin'>,
  Pick<IGetTargetBoxForTargetElementWithMarginOptions, 'elementMargin'>
//
{
  contentElement: HTMLElement;
  getContentElementSize: IGetContentElementSizeFunction;
  targetElement: HTMLElement; // the element where to display the content
}

/**
 * Returns an Observable emitting the ICSSPositionAndSize2D for a sticky overlay.
 * This overlay must stick near 'targetElement'
 */
export function getCSSPositionAndSize2DObservableForStickyOverlayNearTargetElement(
  {
    contentElement,
    getContentElementSize,
    targetElement,
    ...options
  }: IGetCSSPositionAndSize2DObservableForStickyOverlayNearTargetElementOptions,
): IObservable<ICSSPositionAndSize2D> {
  return map$$<void, ICSSPositionAndSize2D>(createTriggerObservable(contentElement), (): ICSSPositionAndSize2D => {
    const containerElement: HTMLElement = getParentElementOrThrow(contentElement);
    const containerElementPositionAndSize: IPositionAndSize2D = getElementPositionAndSize2D(containerElement);
    const targetElementPositionAndSize: IPositionAndSize2D = getElementPositionAndSize2D(targetElement);

    const contentElementSize: ISize2D = getContentElementSize({
      contentElement,
      containerElementPositionAndSize,
      targetElementPositionAndSize,
    });

    return positionAndSize2DToCSSPositionAndSize2D(
      getFittingBoxForContainer$Target$ContentElements({
        containerElementPositionAndSize,
        targetElementPositionAndSize,
        contentElementSize,
        // extra
        ...options,
      }),
    );

  });
}

/*---*/

function getParentElementOrThrow<GElement extends Element>(
  element: Element,
): GElement {
  if (element.parentElement === null) {
    throw new Error(`No parent element`);
  } else {
    return element.parentElement as unknown as GElement;
  }
}

function createTriggerObservable(
  contentElement: HTMLElement,
): IObservable<any> {
  // return timeout(500);
  // return fromAnimationFrame();
  return merge([
    defer(() => {
      return fromResizeObserver(getParentElementOrThrow(contentElement));
    }),
    interval(2000),
  ]);
}
