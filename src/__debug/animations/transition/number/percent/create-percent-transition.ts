import { mapTransition } from '../../modifiers/map-transition';
import { createNumberTransition } from '../create-number-transition';
import { ITransitionFunction } from '../../transition-function.type';

export function createPercentTransition(
  origin: number,
  target: number,
): ITransitionFunction<string> {
  return mapTransition(
    createNumberTransition(origin, target),
    _ => `${_}%`,
  );
}
