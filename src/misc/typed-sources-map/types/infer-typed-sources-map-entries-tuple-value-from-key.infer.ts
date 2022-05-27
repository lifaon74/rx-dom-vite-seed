import { InferTypedMapEntriesTupleValueFromKey } from '../../typed-map/types/infer-typed-map-entries-tuple-value-from-key.infer';
import { InferTypedSourcesMapEntriesTupleKeys } from './infer-typed-sources-map-entries-tuple-keys.infer';
import { ITypedSourcesMapEntriesTuple } from './typed-sources-map-entries-tuple.type';

export type InferTypedSourcesMapEntriesTupleValueFromKey<// generics
  GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple,
  GKey extends InferTypedSourcesMapEntriesTupleKeys<GTypedSourcesTuple>
  //
  > = InferTypedMapEntriesTupleValueFromKey<GTypedSourcesTuple, GKey>;
