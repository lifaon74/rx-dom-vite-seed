import { IMulticastReplayLastSource, IObservable, let$$ } from '@lirx/core';
import { animate } from '../../../../../../__debug/animations/animate/animate';
import { ITransitionProgress, IVoidTransitionFunction } from '../../../../../../__debug/animations/transition/transition-function.type';

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
  protected _animatePromise: Promise<void>;

  constructor(
    {
      transition,
      animationDuration,
    }: IOpenCloseAnimationControllerOptions,
  ) {
    this._transition = transition;
    this._animationDuration = animationDuration;

    this._$state$ = let$$<IOpenCloseAnimationControllerState>('closed');

    this._animationAbortController = new AbortController();
    this._progress = 1;
    this._animatePromise = Promise.resolve();
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

  open(): Promise<void> {
    if (
      (this.state == 'closing')
      || (this.state == 'closed')
    ) {
      this._$state$.emit('opening');

      this._animatePromise = this._animate(false)
        .then((): void => {
          this._$state$.emit('opened');
        });
    }
    return this._animatePromise;
  }

  close(): Promise<void> {
    if (
      (this.state == 'opening')
      || (this.state == 'opened')
    ) {
      this._$state$.emit('closing');

      this._animatePromise = this._animate(true)
        .then((): void => {
          this._$state$.emit('closed');
        });
    }
    return this._animatePromise;
  }

  protected _animate(
    reverse: boolean,
  ): Promise<void> {
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

