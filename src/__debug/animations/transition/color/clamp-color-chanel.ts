import { math_clamp } from '../../math/clamp';

export function clampColorChanel(
  value: number,
): number {
  return math_clamp(Math.round(value), 0, 0xff);
}
