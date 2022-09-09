import { ITransitionFunction, ITransitionProgress } from '../transition-function.type';

export function createCSSNumericValueTransition(
  origin: CSSNumericValue,
  target: CSSNumericValue,
): ITransitionFunction<CSSNumericValue> {
  return (
    progress: ITransitionProgress,
  ): CSSNumericValue => {
    return origin.mul(1 - progress).add(target.mul(progress));
  };
}

