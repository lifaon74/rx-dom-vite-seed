import { IMulticastReplayLastSource, IObservable, IObserver, let$$ } from '@lirx/core';
import { IGenericTypedMapEntry } from '../../typed-map/types/typed-map-entry.type';
import { InferTypedSourcesMapEntriesTupleKeys } from '../types/infer-typed-sources-map-entries-tuple-keys.infer';
import { InferTypedSourcesMapEntriesTupleValueFromKey } from '../types/infer-typed-sources-map-entries-tuple-value-from-key.infer';
import { ITypedSourcesMapEntriesTupleToEntriesTuple } from '../types/typed-sources-map-entries-tuple-to-entries-tuple.infer';
import { ITypedSourcesMapEntriesTuple } from '../types/typed-sources-map-entries-tuple.type';
import { IGenericTypedSourcesMapEntry } from '../types/typed-sources-map-entry.type';
import { ITypedSourcesMap } from './typed-sources-map';

export function createTypedSourcesMap<GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple>(
  _entries: ITypedSourcesMapEntriesTupleToEntriesTuple<GTypedSourcesTuple>,
): ITypedSourcesMap<GTypedSourcesTuple> {
  const map = new Map(
    _entries.map(([name, ...args]: IGenericTypedSourcesMapEntry | [string]): IGenericTypedMapEntry => {
      return [
        name,
        let$$<unknown>(...args),
      ];
    }),
  );

  const has = (
    key: string,
  ): key is InferTypedSourcesMapEntriesTupleKeys<GTypedSourcesTuple> => {
    return map.has(key);
  };

  const getSource = <GKey extends InferTypedSourcesMapEntriesTupleKeys<GTypedSourcesTuple>>(
    key: GKey,
  ): IMulticastReplayLastSource<InferTypedSourcesMapEntriesTupleValueFromKey<GTypedSourcesTuple, GKey>> => {
    if (map.has(key)) {
      return map.get(key)!;
    } else {
      throw new Error(`Invalid key: ${key}`);
    }
  };

  const get$ = <GKey extends InferTypedSourcesMapEntriesTupleKeys<GTypedSourcesTuple>>(
    key: GKey,
  ): IObservable<InferTypedSourcesMapEntriesTupleValueFromKey<GTypedSourcesTuple, GKey>> => {
    return getSource(key).subscribe;
  };

  const get = <GKey extends InferTypedSourcesMapEntriesTupleKeys<GTypedSourcesTuple>>(
    key: GKey,
  ): InferTypedSourcesMapEntriesTupleValueFromKey<GTypedSourcesTuple, GKey> => {
    return getSource(key).getValue();
    // return readObservableValue(this.get$(key), (): never => {
    //   throw new Error(`Unable to read input: ${key}`);
    // });
  };

  const $set = <GKey extends InferTypedSourcesMapEntriesTupleKeys<GTypedSourcesTuple>>(
    key: GKey,
  ): IObserver<InferTypedSourcesMapEntriesTupleValueFromKey<GTypedSourcesTuple, GKey>> => {
    return getSource(key).emit;
  };

  const set = <GKey extends InferTypedSourcesMapEntriesTupleKeys<GTypedSourcesTuple>>(
    key: GKey,
    value: InferTypedSourcesMapEntriesTupleValueFromKey<GTypedSourcesTuple, GKey>,
  ): void => {
    $set<GKey>(key)(value);
  };

  const entries = (): Iterable<[unknown, unknown]> => {
    return map.entries();
  };

  return {
    has,
    getSource,
    get$,
    get,
    $set,
    set,
    entries,
  };
}
