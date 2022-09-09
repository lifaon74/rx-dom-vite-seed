import { readonly_vec3, vec3 } from './vec3.type';

export function vec3_linear_interpolation(
  origin: readonly_vec3,
  target: readonly_vec3,
  current: vec3,
  t: number
): void {
  const _t: number = 1 - t;

  current[0] = (origin[0] * _t) + (target[0] * t);
  current[1] = (origin[1] * _t) + (target[1] * t);
  current[2] = (origin[2] * _t) + (target[2] * t);
}
