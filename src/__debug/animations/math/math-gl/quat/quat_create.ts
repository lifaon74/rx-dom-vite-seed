import { quat } from './quat.type';

export function quat_create(): quat {
  const out: quat = new Float32Array(4);
  out[3] = 1;
  return out;
}

