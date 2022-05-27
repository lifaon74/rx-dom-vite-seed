import { ITypedMapEntriesTuple } from './typed-map-entries-tuple.type';
import { ITypedMapEntry } from './typed-map-entry.type';

export type TypedMapEntriesTupleToValuesTuple<GEntriesTuple extends ITypedMapEntriesTuple> = {
  [Key in keyof GEntriesTuple]: GEntriesTuple[Key] extends ITypedMapEntry<any, infer GValue>
    ? GValue
    : never;
};
