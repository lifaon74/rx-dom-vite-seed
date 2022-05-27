import { ITypedMapEntry } from '../../typed-map/types/typed-map-entry.type';
import { ITypedSourcesMapEntriesTuple } from './typed-sources-map-entries-tuple.type';

export type ITypedSourcesMapEntriesTupleToEntriesTuple<GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple> = {
  [Key in keyof GTypedSourcesTuple]: GTypedSourcesTuple[Key] extends ITypedMapEntry<infer GKey, any>
    ? (GTypedSourcesTuple[Key] | [GKey])
    : never;
};
