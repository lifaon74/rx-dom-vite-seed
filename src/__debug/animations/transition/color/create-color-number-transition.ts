import { ITransitionFunction, ITransitionProgress } from '../transition-function.type';
import { clampColorChanel } from './clamp-color-chanel';
import { IColorNumber } from './color-number.type';

export function createColorNumberTransition(
  origin: IColorNumber,
  target: IColorNumber,
): ITransitionFunction<IColorNumber> {
  return (
    progress: ITransitionProgress,
  ): IColorNumber => {
    const pA: number = 1 - progress;
    const rA: number = (origin >>> 24) & 0xff;
    const gA: number = (origin >>> 16) & 0xff;
    const bA: number = (origin >>> 8) & 0xff;
    const aA: number = (origin >>> 0) & 0xff;

    const pB: number = progress;
    const rB: number = (target >>> 24) & 0xff;
    const gB: number = (target >>> 16) & 0xff;
    const bB: number = (target >>> 8) & 0xff;
    const aB: number = (target >>> 0) & 0xff;

    const rC: number = clampColorChanel((rA * pA) + (rB * pB));
    const gC: number = clampColorChanel((gA * pA) + (gB * pB));
    const bC: number = clampColorChanel((bA * pA) + (bB * pB));
    const aC: number = clampColorChanel((aA * pA) + (aB * pB));

    return (
      (rC << 24)
      | (gC << 16)
      | (bC << 8)
      | aC
    ) >>> 0;
  };
}


