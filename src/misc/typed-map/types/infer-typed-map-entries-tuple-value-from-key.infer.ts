import { InferTypedMapEntriesTupleKeys } from './infer-typed-map-entries-tuple-keys.infer';
import { ITypedMapEntriesTuple } from './typed-map-entries-tuple.type';
import { ITypedMapEntry } from './typed-map-entry.type';

export type InferTypedMapEntriesTupleValueFromKey<// generics
  GEntriesTuple extends ITypedMapEntriesTuple,
  GKey extends InferTypedMapEntriesTupleKeys<GEntriesTuple>
  //
  > = {
  [Key in keyof GEntriesTuple]: GEntriesTuple[Key] extends ITypedMapEntry<GKey, infer GValue>
    ? GValue
    : never;
}[number];
