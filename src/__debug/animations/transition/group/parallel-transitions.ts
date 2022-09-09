import { ITransitionProgress, IVoidTransitionFunction } from '../transition-function.type';

export function parallelTransitions(
  transitions: readonly IVoidTransitionFunction[],
): IVoidTransitionFunction {
  const length: number = transitions.length;

  return (
    progress: ITransitionProgress,
  ): void => {
    for (let i = 0; i < length; i++) {
      transitions[i](progress);
    }
  };
}
