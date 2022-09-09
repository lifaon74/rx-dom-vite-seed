import { readonly_vec3 } from './vec3.type';

export function vec3_dot(
  a: readonly_vec3,
  b: readonly_vec3,
): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
