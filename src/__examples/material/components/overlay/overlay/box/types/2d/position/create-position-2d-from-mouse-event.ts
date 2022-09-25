import { IPosition2D } from './position-2d.type';
import { createPosition2D } from './create-position-2d';

export function createPosition2DFromMouseEvent(
  event: MouseEvent,
): IPosition2D {
  return createPosition2D(
    event.clientX,
    event.clientY,
  );
}
