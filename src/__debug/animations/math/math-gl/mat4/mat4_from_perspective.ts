import { readonly_vec4 } from '../vec4/vec4.type';
import { mat4 } from './mat4.type';

export function mat4_from_perspective(
  out: mat4,
  v: readonly_vec4,
): mat4 {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = v[0];
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = v[1];
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = v[2];
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = v[3];
  return out;
}
