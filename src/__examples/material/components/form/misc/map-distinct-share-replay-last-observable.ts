import {
  IDistinctInitialValue,
  IMapFunction,
  IObservable,
  mapDistinctObservable,
  shareObservableWithMulticastReplayLastSource,
} from '@lirx/core';

export function mapDistinctShareReplayLastObservable<GIn, GOut>(
  subscribe: IObservable<GIn>,
  mapFunction: IMapFunction<GIn, GOut>,
  ...initialValue: IDistinctInitialValue<GOut>
): IObservable<GOut> {
  // return mapDistinctObservable<GIn, GOut>(subscribe, mapFunction);
  // return mapObservable<GIn, GOut>(subscribe, mapFunction);
  return shareObservableWithMulticastReplayLastSource<GOut>(
    mapDistinctObservable<GIn, GOut>(subscribe, mapFunction, ...initialValue),
  );
}

export const mapDistinctShareRL$$ = mapDistinctShareReplayLastObservable;
