import { ITransitionFunction, IVoidTransitionFunction } from '../transition-function.type';
import { createManualStylePropertyTransition } from './create-manual-style-property-transition';

export function createManualStylePropertyTransitionWithComputedInitialValue(
  element: HTMLElement,
  propertyName: string,
  transitionFactory: (initialValue: string) => ITransitionFunction<string>,
): IVoidTransitionFunction {
  return createManualStylePropertyTransition(
    element,
    propertyName,
    transitionFactory(getComputedStyle(element).getPropertyValue(propertyName)),
  );
}
