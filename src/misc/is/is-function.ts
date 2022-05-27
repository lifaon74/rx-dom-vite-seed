import { IGenericFunction } from '@lirx/core';

export function isFunction(
  value: unknown,
): value is IGenericFunction {
  return (typeof value === 'function');
}
