import { ICSSSize2D } from './css-size-2d.type';

export function applyCSSSize2D(
  element: HTMLElement,
  {
    width,
    height,
  }: ICSSSize2D,
): void {
  element.style.setProperty('width', width);
  element.style.setProperty('height', height);
}
