import { mapTransition } from '../../modifiers/map-transition';
import { ITransitionFunction } from '../../transition-function.type';
import { createNumberTransition } from '../create-number-transition';

export function createPxTransition(
  origin: number,
  target: number,
): ITransitionFunction<string> {
  return mapTransition(
    createNumberTransition(origin, target),
    _ => `${_}px`,
  );
}
