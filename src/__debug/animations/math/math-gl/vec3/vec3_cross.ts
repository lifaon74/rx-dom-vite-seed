import { readonly_vec3, vec3 } from './vec3.type';

export function vec3_cross(
  out: vec3,
  a: readonly_vec3,
  b: readonly_vec3,
): vec3 {
  const ax = a[0],
    ay = a[1],
    az = a[2];
  const bx = b[0],
    by = b[1],
    bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
