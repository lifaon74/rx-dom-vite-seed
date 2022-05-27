import { TypedMapEntriesTupleToKeysTuple } from '../../typed-map/types/typed-map-entries-tuple-to-keys-tuple.infer';
import { ITypedSourcesMapEntriesTuple } from './typed-sources-map-entries-tuple.type';

export type ITypedSourcesMapEntriesTupleToKeysTuple<GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple> = {
  [GKey in keyof TypedMapEntriesTupleToKeysTuple<GTypedSourcesTuple>]: TypedMapEntriesTupleToKeysTuple<GTypedSourcesTuple>[GKey] extends string
    ? TypedMapEntriesTupleToKeysTuple<GTypedSourcesTuple>[GKey]
    : never;
};
