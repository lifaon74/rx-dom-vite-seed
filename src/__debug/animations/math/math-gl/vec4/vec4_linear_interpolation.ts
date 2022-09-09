import { readonly_vec4, vec4 } from './vec4.type';

export function vec4_linear_interpolation(
  origin: readonly_vec4,
  target: readonly_vec4,
  current: vec4,
  t: number
): void {
  const _t: number = 1 - t;

  current[0] = (origin[0] * _t) + (target[0] * t);
  current[1] = (origin[1] * _t) + (target[1] * t);
  current[2] = (origin[2] * _t) + (target[2] * t);
  current[3] = (origin[3] * _t) + (target[3] * t);
}
