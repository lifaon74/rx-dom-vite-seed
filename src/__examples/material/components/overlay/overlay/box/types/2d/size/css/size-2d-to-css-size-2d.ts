import { ICSSSize2D } from './css-size-2d.type';
import { ISize2D } from '../size-2d.type';

export function size2DToCSSSize2D(
  {
    width,
    height,
  }: ISize2D,
): ICSSSize2D {
  return {
    width: `${ width }px`,
    height: `${ height }px`,
  };
}
