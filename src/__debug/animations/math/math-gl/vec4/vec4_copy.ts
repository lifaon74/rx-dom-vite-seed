import { vec4, readonly_vec4 } from './vec4.type';

export function vec4_copy(
  out: vec4,
  a: readonly_vec4,
): vec4 {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}


