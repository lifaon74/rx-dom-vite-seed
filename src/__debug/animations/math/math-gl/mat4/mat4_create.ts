import { mat4 } from './mat4.type';

export function mat4_create(): mat4 {
  const out: mat4 = new Float32Array(16);
  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
