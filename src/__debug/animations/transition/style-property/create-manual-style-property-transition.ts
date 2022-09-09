import { ITransitionFunction, ITransitionProgress, IVoidTransitionFunction } from '../transition-function.type';

export function createManualStylePropertyTransition(
  element: HTMLElement,
  propertyName: string,
  transition: ITransitionFunction<string>,
): IVoidTransitionFunction {
  return (
    progress: ITransitionProgress,
  ): void => {
    element.style.setProperty(propertyName, transition(progress));
  };
}

