import { readonly_quat } from './quat.type';

export function quat_equals(
  a: readonly_quat,
  b: readonly_quat,
): boolean {
  return (a[0] === b[0])
    && (a[1] === b[1])
    && (a[2] === b[2])
    && (a[3] === b[3])
    ;
}
