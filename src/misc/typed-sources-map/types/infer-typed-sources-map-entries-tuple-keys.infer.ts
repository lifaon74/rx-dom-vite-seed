import { ITypedSourcesMapEntriesTupleToKeysTuple } from './typed-sources-map-entries-tuple-to-keys-tuple.infer';
import { ITypedSourcesMapEntriesTuple } from './typed-sources-map-entries-tuple.type';

export type InferTypedSourcesMapEntriesTupleKeys<GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple> = ITypedSourcesMapEntriesTupleToKeysTuple<GTypedSourcesTuple>[number];
