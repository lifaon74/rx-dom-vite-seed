import { ITransitionProgress } from '../../transition/transition-function.type';

export function linearTimingFunction(
  progress: ITransitionProgress,
): ITransitionProgress {
  return progress;
}

// export function createLinearTimingFunction(): ITimingFunction {
//   return linearTimingFunction;
// }
