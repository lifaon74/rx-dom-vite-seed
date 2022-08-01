import { ITimingFunction } from '../timing-function.type';
import { cubicBezier } from './cubic-bezier';

export function createCubicBezierTimingFunction(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): ITimingFunction {
  return cubicBezier(x1, y1, x2, y2);
}

export const easeTimingFunction = createCubicBezierTimingFunction(0.25, 0.1, 0.25, 1.0);

export const easeInTimingFunction = createCubicBezierTimingFunction(0.42, 0, 1.0, 1.0);

export const easeOutTimingFunction = createCubicBezierTimingFunction(0, 0, 0.58, 1.0);

export const easeInOutTimingFunction = createCubicBezierTimingFunction(0.42, 0, 0.58, 1.0);

