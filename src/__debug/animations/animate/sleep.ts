import { createAbortError } from '@lirx/core';

export function sleep(
  duration: number,
  signal?: AbortSignal,
): Promise<void> {
  return new Promise<void>((
    resolve: (value: void) => void,
    reject: (reason?: any) => void,
  ): void => {
    const clear = () => {
      signal?.removeEventListener?.('abort', _reject);
    };

    const _resolve = () => {
      clear();
      resolve();
    };

    const _reject = () => {
      clear();
      clearTimeout(timer);
      reject(createAbortError({ signal }));
    };

    signal?.addEventListener?.('abort', _reject);

    const timer = setTimeout(resolve, duration);

    if (signal?.aborted) {
      _reject();
    }
  });
}
