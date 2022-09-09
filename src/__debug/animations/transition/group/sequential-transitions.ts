import { math_clamp } from '../../math/clamp';
import { ITransitionProgress, IVoidTransitionFunction } from '../transition-function.type';

export type ITransitionWithWeight = [
  transtion: IVoidTransitionFunction,
  weight: number,
];

export function sequentialTransitions(
  transitions: readonly ITransitionWithWeight[],
): IVoidTransitionFunction {
  const length: number = transitions.length;
  const _transitions: IVoidTransitionFunction[] = new Array(length);

  let total: number = 0;
  for (let i = 0; i < length; i++) {
    total += transitions[i][1];
  }

  let step: number = 0;
  for (let i = 0; i < length; i++) {
    const [transition, weight] = transitions[i];
    const origin: number = step;
    const range: number = weight / total;
    step += range;

    _transitions[i] = (
      progress: ITransitionProgress,
    ): void => {
      if (progress >= origin) {
        transition(math_clamp((progress - origin) / range, 0, 1));
      }
    };
  }

  return (
    progress: ITransitionProgress,
  ): void => {
    for (let i = 0; i < length; i++) {
      _transitions[i](progress);
    }
  };
}
