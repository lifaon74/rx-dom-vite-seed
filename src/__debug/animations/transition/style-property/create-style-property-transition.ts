import { createUnparsedCSSStyleValueTransition } from '../css-style-value/create-unparsed-css-style-value-transition';
import { IVoidTransitionFunction } from '../transition-function.type';
import { createManualStylePropertyTransition } from './create-manual-style-property-transition';

export function createStylePropertyTransition(
  element: HTMLElement,
  propertyName: string,
  origin: string,
  target: string,
): IVoidTransitionFunction {
  return createManualStylePropertyTransition(
    element,
    propertyName,
    createUnparsedCSSStyleValueTransition(
      propertyName,
      origin,
      target,
    ),
  );
}

