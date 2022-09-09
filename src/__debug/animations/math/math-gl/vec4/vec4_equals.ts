import { readonly_vec4 } from './vec4.type';

export function vec4_equals(
  a: readonly_vec4,
  b: readonly_vec4,
): boolean {
  return (a[0] === b[0])
    && (a[1] === b[1])
    && (a[2] === b[2])
    && (a[3] === b[3])
    ;
}
