import { ICSSPosition2D } from './css-position-2d.type';
import { IPosition2D } from '../position-2d.type';

export function position2DToCSSPosition2D(
  {
    left,
    top,
  }: IPosition2D,
): ICSSPosition2D {
  return {
    left: `${ left }px`,
    top: `${ top }px`,
  };
}
