import { createAbortError } from '@lirx/core';
import { ITransitionProgress, IVoidTransitionFunction } from '../transition/transition-function.type';



export interface IAnimateOptions {
  transition: IVoidTransitionFunction;
  duration: number;
  currentTime?: number;
  signal?: AbortSignal;
}

export function animate(
  {
    transition,
    duration,
    currentTime = 0,
    signal,
  }: IAnimateOptions,
): Promise<void> {
  return new Promise<void>((
    resolve: (value: void) => void,
    reject: (reason?: any) => void,
  ): void => {
    const originTime: number = Date.now() - currentTime;
    let timer: number;

    const loop = () => {
      timer = requestAnimationFrame(() => {
        const progress: ITransitionProgress = Math.min(1, (Date.now() - originTime) / duration);
        transition(progress);

        if (progress < 1) {
          loop();
        } else {
          _resolve();
        }
      });
    };

    const clear = () => {
      signal?.removeEventListener?.('abort', _reject);
    };

    const _resolve = () => {
      clear();
      resolve();
    };

    const _reject = () => {
      clear();
      cancelAnimationFrame(timer);
      reject(createAbortError({ signal }));
    };

    signal?.addEventListener?.('abort', _reject);

    loop();

    if (signal?.aborted) {
      _reject();
    }
  });
}


/*-------------------*/

export interface IOnAnimationEndFunction {
  (
    stopped: boolean,
  ): void;
}

export interface IStopAnimationFunction {
  (
    progress?: number,
  ): void;
}

const DEFAULT_ANIMATE_ON_END = () => {
};

export function animate2(
  duration: number,
  transition: IVoidTransitionFunction,
  onEnd?: IOnAnimationEndFunction,
): IStopAnimationFunction {
  return animateFactory(
    duration,
    () => transition,
    onEnd,
  );
}

export function animateFactory(
  duration: number,
  transitionFactory: () => IVoidTransitionFunction,
  onEnd: IOnAnimationEndFunction = DEFAULT_ANIMATE_ON_END,
): IStopAnimationFunction {
  const originTime: number = Date.now();
  let transition: IVoidTransitionFunction;
  let timer: number;
  let running: boolean = true;

  const loop = () => {
    timer = requestAnimationFrame(() => {
      const progress: ITransitionProgress = Math.min(1, (Date.now() - originTime) / duration);
      transition(progress);

      if (progress < 1) {
        loop();
      } else {
        running = false;
        onEnd(false);
      }
    });
  };

  timer = requestAnimationFrame(() => {
    transition = transitionFactory();
    transition(0);
    loop();
  });

  return (
    progress?: number,
  ): void => {
    if (running) {
      running = false;
      cancelAnimationFrame(timer);

      if (progress !== void 0) {
        if (transition === void 0) {
          transition = transitionFactory();
        }
        transition(progress);
      }

      onEnd(true);
    }
  };
}
