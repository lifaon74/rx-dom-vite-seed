import { vec4 } from '../../../math/math-gl/vec4/vec4.type';
import { vec4_linear_interpolation } from '../../../math/math-gl/vec4/vec4_linear_interpolation';

export function interpolate_perspective(
  origin: vec4,
  target: vec4,
  current: vec4,
  t: number,
): void {
  vec4_linear_interpolation(origin, target, current, t);
}
