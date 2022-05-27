import { IMulticastReplayLastSource, IObservable, IObserver, let$$ } from '@lirx/core';
import { IGenericTypedMapEntry } from '../typed-map/types/typed-map-entry.type';
import { InferTypedSourcesMapEntriesTupleKeys } from './types/infer-typed-sources-map-entries-tuple-keys.infer';
import { InferTypedSourcesMapEntriesTupleValueFromKey } from './types/infer-typed-sources-map-entries-tuple-value-from-key.infer';
import { ITypedSourcesMapEntriesTupleToKeysTuple } from './types/typed-sources-map-entries-tuple-to-keys-tuple.infer';
import { ITypedSourcesMapEntriesTuple } from './types/typed-sources-map-entries-tuple.type';

/**
 * @deprecated
 */
export class TypedSourcesMap<GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple> {

  protected readonly _map: ReadonlyMap<string, IMulticastReplayLastSource<any>>;

  constructor(
    keys: ITypedSourcesMapEntriesTupleToKeysTuple<GTypedSourcesTuple>,
  ) {
    this._map = new Map(
      keys.map((name: string): IGenericTypedMapEntry => {
        return [
          name,
          let$$<unknown>(),
        ];
      }),
    );
  }

  has(
    key: string,
  ): key is InferTypedSourcesMapEntriesTupleKeys<GTypedSourcesTuple> {
    return this._map.has(key);
  }

  getSource<GKey extends InferTypedSourcesMapEntriesTupleKeys<GTypedSourcesTuple>>(
    key: GKey,
  ): IMulticastReplayLastSource<InferTypedSourcesMapEntriesTupleValueFromKey<GTypedSourcesTuple, GKey>> {
    return this._map.get(key)!;
  }

  get$<GKey extends InferTypedSourcesMapEntriesTupleKeys<GTypedSourcesTuple>>(
    key: GKey,
  ): IObservable<InferTypedSourcesMapEntriesTupleValueFromKey<GTypedSourcesTuple, GKey>> {
    return this.getSource(key).subscribe;
  }

  get<GKey extends InferTypedSourcesMapEntriesTupleKeys<GTypedSourcesTuple>>(
    key: GKey,
  ): InferTypedSourcesMapEntriesTupleValueFromKey<GTypedSourcesTuple, GKey> {
    return this.getSource(key).getValue();
    // return readObservableValue(this.get$(key), (): never => {
    //   throw new Error(`Unable to read input: ${key}`);
    // });
  }

  $set<GKey extends InferTypedSourcesMapEntriesTupleKeys<GTypedSourcesTuple>>(
    key: GKey,
  ): IObserver<InferTypedSourcesMapEntriesTupleValueFromKey<GTypedSourcesTuple, GKey>> {
    return this.getSource(key).emit;
  }

  set<GKey extends InferTypedSourcesMapEntriesTupleKeys<GTypedSourcesTuple>>(
    key: GKey,
    value: InferTypedSourcesMapEntriesTupleValueFromKey<GTypedSourcesTuple, GKey>,
  ): void {
    this.$set<GKey>(key)(value);
  }
}


