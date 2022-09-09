import { readonly_vec3, vec3 } from './vec3.type';

export function vec3_scale_and_add(
  out: vec3,
  a: readonly_vec3,
  b: readonly_vec3,
  scale: number,
): vec3 {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  return out;
}
