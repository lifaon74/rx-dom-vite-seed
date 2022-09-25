import { ICSSPositionAndSize2D } from './css-position-and-size-2d.type';
import { IPositionAndSize2D } from '../position-and-size-2d.type';

export function positionAndSize2DToCSSPositionAndSize2D(
  {
    left,
    top,
    width,
    height,
  }: IPositionAndSize2D,
): ICSSPositionAndSize2D {
  return {
    left: `${ left }px`,
    top: `${ top }px`,
    width: `${ width }px`,
    height: `${ height }px`,
  };
}
