import { InferTypedSourcesMapEntriesTupleKeys } from '../../types/infer-typed-sources-map-entries-tuple-keys.infer';
import { ITypedSourcesMapEntriesTuple } from '../../types/typed-sources-map-entries-tuple.type';

export interface ITypedSourcesMapHasFunction<GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple> {
  (
    key: string,
  ): key is InferTypedSourcesMapEntriesTupleKeys<GTypedSourcesTuple>;
}
