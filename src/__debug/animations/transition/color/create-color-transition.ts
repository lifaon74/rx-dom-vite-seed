import { mapTransition } from '../modifiers/map-transition';
import { ITransitionFunction } from '../transition-function.type';
import { colorNumberToColorString } from './color-number-to-color-string';
import { colorStringToColorNumber } from './color-string-to-color-number';
import { createColorNumberTransition } from './create-color-number-transition';

export function createColorTransition(
  origin: string,
  target: string,
): ITransitionFunction<string> {
  return mapTransition(
    createColorNumberTransition(
      colorStringToColorNumber(origin),
      colorStringToColorNumber(target),
    ),
    colorNumberToColorString,
  );
}
