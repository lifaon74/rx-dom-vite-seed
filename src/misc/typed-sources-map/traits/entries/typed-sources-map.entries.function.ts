import { InferTypedSourcesMapEntriesTupleKeys } from '../../types/infer-typed-sources-map-entries-tuple-keys.infer';
import { InferTypedSourcesMapEntriesTupleValues } from '../../types/infer-typed-sources-map-entries-tuple-values.infer';
import { ITypedSourcesMapEntriesTuple } from '../../types/typed-sources-map-entries-tuple.type';

export interface ITypedSourcesMapEntriesFunction<GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple> {
  // (): Iterable<[InferTypedSourcesMapEntriesTupleKeys<GTypedSourcesTuple>, InferTypedSourcesMapEntriesTupleValues<GTypedSourcesTuple>]>;
  (): Iterable<[unknown, unknown]>;
}
