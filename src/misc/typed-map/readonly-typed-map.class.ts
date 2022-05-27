import { InferTypedMapEntriesTupleKeys } from './types/infer-typed-map-entries-tuple-keys.infer';
import { InferTypedMapEntriesTupleValueFromKey } from './types/infer-typed-map-entries-tuple-value-from-key.infer';
import { ITypedMapEntriesTuple } from './types/typed-map-entries-tuple.type';

export class ReadonlyTypedMap<GEntriesTuple extends ITypedMapEntriesTuple> {
  protected readonly _map: ReadonlyMap<any, any>;

  constructor(
    entries: GEntriesTuple,
  ) {
    this._map = new Map(entries);
  }

  get<GKey extends InferTypedMapEntriesTupleKeys<GEntriesTuple>>(
    key: GKey,
  ): InferTypedMapEntriesTupleValueFromKey<GEntriesTuple, GKey> {
    return this._map.get(key);
  }
}

// type A = ['A', boolean];
// type B = ['B', number];
// type AB = [
//   A,
//   B,
// ];
//
//
// type a = InferTypedMapEntriesTupleValueFromKey<AB, 'A'>;
//
// // const a = new ReadonlyTypedMap(tuple(
// //   tuple('A', 1),
// //   tuple('B', true),
// // ));
//
// const a = new ReadonlyTypedMap<AB>([
//   ['A', true],
//   ['B', 1],
// ]);
//
// const b = a.get('A');

