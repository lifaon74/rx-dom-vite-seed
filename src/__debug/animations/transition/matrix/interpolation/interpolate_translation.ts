import { vec3 } from '../../../math/math-gl/vec3/vec3.type';
import { vec3_linear_interpolation } from '../../../math/math-gl/vec3/vec3_linear_interpolation';

export function interpolate_translation(
  origin: vec3,
  target: vec3,
  current: vec3,
  t: number,
): void {
  vec3_linear_interpolation(origin, target, current, t);
}
