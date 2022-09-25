import { IPosition2D } from './position-2d.type';
import { createPosition2D } from './create-position-2d';

export function translatePosition2D(
  position: IPosition2D,
  translation: IPosition2D,
): IPosition2D {
  return createPosition2D(
    position.left + translation.left,
    position.top + translation.top,
  );
}
