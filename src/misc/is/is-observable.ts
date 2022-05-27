import { IObservable } from '@lirx/core';
import { isFunction } from './is-function';

export function isObservable<GValue>(
  value: unknown,
): value is IObservable<GValue> {
  return isFunction(value);
}
