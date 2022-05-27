import { ITypedMapEntriesTuple } from './typed-map-entries-tuple.type';
import { ITypedMapEntry } from './typed-map-entry.type';

export type TypedMapEntriesTupleToKeysTuple<GEntriesTuple extends ITypedMapEntriesTuple> = {
  [Key in keyof GEntriesTuple]: GEntriesTuple[Key] extends ITypedMapEntry<infer GKey, any>
    ? GKey
    : never;
};
