import { ITransitionFunction, ITransitionProgress } from '../transition-function.type';

export function mapTransition<GIn, GOut>(
  transition: ITransitionFunction<GIn>,
  map: (value: GIn) => GOut,
): ITransitionFunction<GOut> {
  return (
    progress: ITransitionProgress,
  ): GOut => {
    return map(transition(progress));
  };
}
