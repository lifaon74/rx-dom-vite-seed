import { ITransitionProgress } from '../../transition/transition-function.type';

export function invertTimingFunction(
  progress: ITransitionProgress,
): ITransitionProgress {
  return 1 - progress;
}

