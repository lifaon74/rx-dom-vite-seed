import { ICSSPosition2D } from './css-position-2d.type';

export function applyCSSPosition2D(
  element: HTMLElement,
  {
    left,
    top,
  }: ICSSPosition2D,
): void {
  element.style.setProperty('left', left);
  element.style.setProperty('top', top);
}
