import { createCSSStyleValueTransition } from './create-css-style-value-transition';
import { ITransitionFunction } from '../transition-function.type';

export function createUnparsedCSSStyleValueTransition(
  propertyName: string,
  origin: string,
  target: string,
  element?: HTMLElement,
): ITransitionFunction<string> {
  return createCSSStyleValueTransition(
    CSSStyleValue.parse(propertyName, origin),
    CSSStyleValue.parse(propertyName, target),
    element,
  );
}
