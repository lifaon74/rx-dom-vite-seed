import { TypedMapEntriesTupleToKeysTuple } from './typed-map-entries-tuple-to-keys-tuple.infer';
import { ITypedMapEntriesTuple } from './typed-map-entries-tuple.type';

export type InferTypedMapEntriesTupleKeys<GEntriesTuple extends ITypedMapEntriesTuple> = TypedMapEntriesTupleToKeysTuple<GEntriesTuple>[number];
