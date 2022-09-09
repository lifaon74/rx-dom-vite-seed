import { ITransitionFunction, ITransitionProgress } from '../transition-function.type';

export function createNumberTransition(
  origin: number,
  target: number,
): ITransitionFunction<number> {
  return (
    progress: ITransitionProgress,
  ): number => {
    return (origin * (1 - progress)) + (target * progress);
  };
}
