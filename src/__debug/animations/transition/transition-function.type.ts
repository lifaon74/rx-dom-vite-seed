export type ITransitionProgress = number; // [0, 1]

export interface ITransitionFunction<GValue> {
  (
    progress: ITransitionProgress,
  ): GValue;
}

export type IVoidTransitionFunction = ITransitionFunction<void>;
