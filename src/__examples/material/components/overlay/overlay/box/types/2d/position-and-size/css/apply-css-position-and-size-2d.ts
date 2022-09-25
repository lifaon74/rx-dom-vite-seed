import { ICSSPositionAndSize2D } from './css-position-and-size-2d.type';
import { applyCSSPosition2D } from '../../position/css/apply-css-position-2d';
import { applyCSSSize2D } from '../../size/css/apply-css-size-2d';

export function applyCSSPositionAndSize2D(
  element: HTMLElement,
  positionAndSize: ICSSPositionAndSize2D,
): void {
  applyCSSPosition2D(element, positionAndSize);
  applyCSSSize2D(element, positionAndSize);
}
