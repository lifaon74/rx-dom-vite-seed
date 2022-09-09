import { ITimingFunction } from '../../timing/timing-function.type';
import { ITransitionFunction, ITransitionProgress } from '../transition-function.type';

export function applyTimingFunctionToTransition<GValue>(
  transition: ITransitionFunction<GValue>,
  timingFunction: ITimingFunction,
): ITransitionFunction<GValue> {
  return (
    progress: ITransitionProgress,
  ): GValue => {
    return transition(timingFunction(progress));
  };
}
