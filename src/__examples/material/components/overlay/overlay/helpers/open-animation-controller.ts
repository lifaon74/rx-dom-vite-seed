import { animate, IAnimateResult, ITransitionProgress, IVoidTransitionFunction } from '@lirx/animations';
import { createMulticastReplayLastSource, IMulticastReplayLastSource, IObservable } from '@lirx/core';

/** TYPES **/

export interface IOpenCloseAnimationControllerOptions {
  transition: IVoidTransitionFunction;
  animationDuration: number;
}

export type IOpenCloseAnimationControllerState =
  | 'opening'
  | 'opened'
  | 'closing'
  | 'closed'
  ;

/** CLASS **/

export class OpenAnimationController {
  protected readonly _transition: IVoidTransitionFunction;
  protected readonly _animationDuration: number;

  protected readonly _$state$: IMulticastReplayLastSource<IOpenCloseAnimationControllerState>;

  protected _animationAbortController: AbortController;
  protected _progress: ITransitionProgress;
  protected _animatePromise: Promise<ITransitionProgress>;

  constructor(
    {
      transition,
      animationDuration,
    }: IOpenCloseAnimationControllerOptions,
  ) {
    this._transition = transition;
    this._animationDuration = animationDuration;

    this._$state$ = createMulticastReplayLastSource<IOpenCloseAnimationControllerState>('closed');

    this._animationAbortController = new AbortController();
    this._progress = 1;
    this._animatePromise = Promise.resolve(1);
  }

  get transition(): IVoidTransitionFunction {
    return this._transition;
  }

  get animationDuration(): number {
    return this._animationDuration;
  }

  get state(): IOpenCloseAnimationControllerState {
    return this._$state$.getValue();
  }

  get state$(): IObservable<IOpenCloseAnimationControllerState> {
    return this._$state$.subscribe;
  }

  open(): Promise<ITransitionProgress> {
    if (
      (this.state == 'closing')
      || (this.state == 'closed')
    ) {
      this._$state$.emit('opening');

      this._animatePromise = this._animate(false)
        .then((progress: ITransitionProgress): ITransitionProgress => {
          if (progress === 1) {
            this._$state$.emit('opened');
          }
          return progress;
        });
    }
    return this._animatePromise;
  }

  close(): Promise<ITransitionProgress> {
    if (
      (this.state == 'opening')
      || (this.state == 'opened')
    ) {
      this._$state$.emit('closing');

      this._animatePromise = this._animate(true)
        .then((progress: ITransitionProgress): ITransitionProgress => {
          if (progress === 1) {
            this._$state$.emit('closed');
          }
          return progress;
        });
    }
    return this._animatePromise;
  }

  protected _animate(
    reverse: boolean,
  ): Promise<IAnimateResult> {
    this._animationAbortController.abort();
    this._animationAbortController = new AbortController();

    const transition = (
      progress: ITransitionProgress,
    ): void => {
      this._progress = progress;
      return this._transition(
        reverse
          ? (1 - progress)
          : progress,
      );
    };

    const duration: number = this._animationDuration;

    const currentTime: number = (this._progress === 1)
      ? 0
      : (1 - this._progress) * duration;

    const signal: AbortSignal = this._animationAbortController.signal;

    return animate({
      transition,
      duration,
      currentTime,
      signal,
    });
  }
}

