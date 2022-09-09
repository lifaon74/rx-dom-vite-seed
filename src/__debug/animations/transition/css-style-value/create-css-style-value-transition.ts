import { colorNumberToColorString } from '../color/color-number-to-color-string';
import { IColorNumber } from '../color/color-number.type';
import { colorStringToColorNumber } from '../color/color-string-to-color-number';
import { createColorNumberTransition } from '../color/create-color-number-transition';
import { mapTransition } from '../modifiers/map-transition';
import { ITransitionFunction } from '../transition-function.type';
import { createCSSNumericValueTransition } from './create-css-numeric-value-transition';
import { createCSSTransformValueTransition } from './create-css-transform-value-transition';

export function createCSSStyleValueTransition(
  origin: CSSStyleValue,
  target: CSSStyleValue,
  element?: HTMLElement, // TODO could be used for https://developer.mozilla.org/en-US/docs/Web/API/CSSVariableReferenceValue
): ITransitionFunction<CSSStyleValue> {
  if (
    (origin instanceof CSSNumericValue)
    && (target instanceof CSSNumericValue)
  ) {
    return createCSSNumericValueTransition(origin, target);
  } else if (
    (origin instanceof CSSTransformValue)
    && (target instanceof CSSTransformValue)
  ) {
    return createCSSTransformValueTransition(origin, target);
  } else {
    try {
      return mapTransition(
        createColorNumberTransition(
          colorStringToColorNumber(origin.toString()),
          colorStringToColorNumber(target.toString()),
        ),
        (color: IColorNumber): CSSStyleValue => {
          return {
            toString: () => colorNumberToColorString(color),
          };
        },
      );
    } catch {
      throw new Error(`Incompatible CSSStyleValue`);
    }
  }
}
