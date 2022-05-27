import { ITypedSourcesMapEntriesTupleToValuesTuple } from './typed-sources-map-entries-tuple-to-values-tuple.infer';
import { ITypedSourcesMapEntriesTuple } from './typed-sources-map-entries-tuple.type';

export type InferTypedSourcesMapEntriesTupleValues<GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple> = ITypedSourcesMapEntriesTupleToValuesTuple<GTypedSourcesTuple>[number];
