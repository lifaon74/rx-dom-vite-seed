import { TypedMapEntriesTupleToValuesTuple } from '../../typed-map/types/typed-map-entries-tuple-to-values-tuple.infer';
import { ITypedSourcesMapEntriesTuple } from './typed-sources-map-entries-tuple.type';

export type ITypedSourcesMapEntriesTupleToValuesTuple<GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple> = {
  [GKey in keyof TypedMapEntriesTupleToValuesTuple<GTypedSourcesTuple>]: TypedMapEntriesTupleToValuesTuple<GTypedSourcesTuple>[GKey] extends string
    ? TypedMapEntriesTupleToValuesTuple<GTypedSourcesTuple>[GKey]
    : never;
};
