export interface IElementWithKeyframe {
  element: Element;
  keyframes: readonly Keyframe[];
}

// export class GroupedKeyframeEffect extends KeyframeEffect {
//
//   protected _keyframeEffects: KeyframeEffect[];
//
//   constructor(
//     keyframes: readonly IElementWithKeyframe[],
//     options?: KeyframeEffectOptions,
//   ) {
//     super(null, null);
//     this._keyframeEffects = keyframes.map(
//       (
//         {
//           element,
//           keyframes,
//         }: IElementWithKeyframe,
//       ): KeyframeEffect => {
//         return new KeyframeEffect(
//           element,
//           keyframes as Keyframe[],
//           options,
//         );
//       },
//     );
//   }
//
//   getComputedTiming(): ComputedEffectTiming {
//     return this._keyframeEffects[0].getComputedTiming();
//   }
//
//   getTiming(): EffectTiming {
//     return this._keyframeEffects[0].getTiming();
//   }
//
//   updateTiming(timing?: OptionalEffectTiming): void {
//     return this._keyframeEffects[0].updateTiming(timing);
//   }
// }

// export function createGroupedAnimation(
//   keyframes: readonly IElementWithKeyframe[],
//   options?: KeyframeEffectOptions,
// ) {
//
// }

export class GroupedAnimation implements Animation {

  protected _animations: Animation[];

  constructor(
    keyframes: readonly IElementWithKeyframe[],
    options?: KeyframeEffectOptions,
    timeline?: AnimationTimeline,
  ) {
    if (keyframes.length === 0) {
      throw new Error(`Require at least one IElementWithKeyframe`);
    }
    this._animations = keyframes.map(
      (
        {
          element,
          keyframes,
        }: IElementWithKeyframe,
      ): Animation => {
        return new Animation(
          new KeyframeEffect(
            element,
            keyframes as Keyframe[],
            options,
          ),
          timeline,
        );
      },
    );
  }

  get currentTime(): CSSNumberish | null {
    return this._animations[0].currentTime;
  }

  set currentTime(
    value: CSSNumberish | null,
  ) {
    for (let i = 0, l = this._animations.length; i < l; i++) {
      this._animations[i].currentTime = value;
    }
  }

  get effect(): AnimationEffect | null {
    return this._animations[0].effect;
  }

  set effect(
    value: AnimationEffect | null,
  ) {
    for (let i = 0, l = this._animations.length; i < l; i++) {
      this._animations[i].effect = value;
    }
  }

  get finished(): Promise<Animation> {
    return Promise.all(
      this._animations.map(_ => _.finished),
    )
      .then((): Animation => this);
  }


  get id(): string {
    return this._animations[0].id;
  }

  set id(
    value: string,
  ) {
    for (let i = 0, l = this._animations.length; i < l; i++) {
      this._animations[i].id = value;
    }
  }

  oncancel: ((this: Animation, ev: AnimationPlaybackEvent) => any) | null;
  onfinish: ((this: Animation, ev: AnimationPlaybackEvent) => any) | null;
  onremove: ((this: Animation, ev: Event) => any) | null;

  get pending(): boolean {
    return this._animations.every(_ => _.pending);
  }

  get playState(): AnimationPlayState {
    return this._animations[0].playState;
  }

  playbackRate: number;
  readonly ready: Promise<Animation>;
  readonly replaceState: AnimationReplaceState;
  startTime: CSSNumberish | null;
  timeline: AnimationTimeline | null;

  cancel(): void {

  }

  commitStyles(): void;

  finish(): void;

  pause(): void;

  persist(): void;

  play(): void;

  reverse(): void;

  updatePlaybackRate(playbackRate: number): void;

  addEventListener<K extends keyof AnimationEventMap>(type: K, listener: (this: Animation, ev: AnimationEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;

  removeEventListener<K extends keyof AnimationEventMap>(type: K, listener: (this: Animation, ev: AnimationEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;

}

export function debugAnimation(): void {
  const dummy = (color: string) => {
    const elt = document.createElement('div');
    elt.style.width = '300px';
    elt.style.height = '300px';
    elt.style.background = color;
    document.body.append(elt);
    return elt;
  };

  const elt1 = dummy('red');
  const elt2 = dummy('green');

  // const animation = new Animation(
  //   new KeyframeEffect(
  //     elt1,
  //     [
  //       {
  //         opacity: '0',
  //       },
  //       {
  //         opacity: '1',
  //       },
  //     ],
  //     {
  //       duration: 2000,
  //       // fill: 'both',
  //       iterations: 50,
  //     },
  //   ),
  // );

  const animation = new GroupedAnimation(
    [
      {
        element: elt1,
        keyframes: [
          {
            opacity: '0',
          },
          {
            opacity: '1',
          },
        ],
      },
      {
        element: elt2,
        keyframes: [
          {
            opacity: '1',
          },
          {
            opacity: '0',
          },
        ],
      },
    ],
    {
      duration: 2000,
      // fill: 'both',
      iterations: 50,
    },
  );

  animation.play();
}
