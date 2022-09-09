import { isAbortError } from '@lirx/core';

export function throwIfNotAnAbortError(
  error: any,
): void {
  if (!isAbortError(error)) {
    throw error;
  }
}
