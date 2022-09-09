import { createUnparsedCSSStyleValueTransition } from '../css-style-value/create-unparsed-css-style-value-transition';
import { ITransitionFunction, IVoidTransitionFunction } from '../transition-function.type';
import {
  createManualStylePropertyTransitionWithComputedInitialValue,
} from './create-manual-style-property-transition-with-computed-initial-value';

export function createTargetStylePropertyTransition(
  element: HTMLElement,
  propertyName: string,
  target: string,
): IVoidTransitionFunction {
  return createManualStylePropertyTransitionWithComputedInitialValue(
    element,
    propertyName,
    (origin: string): ITransitionFunction<string> => {
      return createUnparsedCSSStyleValueTransition(
        propertyName,
        origin,
        target,
      );
    },
  );
}
