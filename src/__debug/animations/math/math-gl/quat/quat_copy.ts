import { quat, readonly_quat } from './quat.type';

export function quat_copy(
  out: quat,
  a: readonly_quat,
): quat {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}


