import { IPositionAndSize2D } from './position-and-size-2d.type';

export function getElementPositionAndSize2D(
  element: HTMLElement,
): IPositionAndSize2D {
  return element.getBoundingClientRect();
}
