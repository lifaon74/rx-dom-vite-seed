import { IPosition2D } from './position-2d.type';

export function createPosition2D(
  left: number,
  top: number,
): IPosition2D {
  return {
    left,
    top,
  };
}
