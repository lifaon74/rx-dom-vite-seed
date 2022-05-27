import { IObserver } from '@lirx/core';
import { InferTypedSourcesMapEntriesTupleKeys } from '../../types/infer-typed-sources-map-entries-tuple-keys.infer';
import { InferTypedSourcesMapEntriesTupleValueFromKey } from '../../types/infer-typed-sources-map-entries-tuple-value-from-key.infer';
import { ITypedSourcesMapEntriesTuple } from '../../types/typed-sources-map-entries-tuple.type';

export interface ITypedSourcesMap$SetFunction<GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple> {
  <GKey extends InferTypedSourcesMapEntriesTupleKeys<GTypedSourcesTuple>>(
    key: GKey,
  ): IObserver<InferTypedSourcesMapEntriesTupleValueFromKey<GTypedSourcesTuple, GKey>>;
}
