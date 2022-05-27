import { ITypedSourcesMapEntriesTuple } from '../../types/typed-sources-map-entries-tuple.type';
import { ITypedSourcesMap$SetFunction } from './typed-sources-map.$set.function';

export interface ITypedSourcesMap$SetTrait<GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple> {
  $set: ITypedSourcesMap$SetFunction<GTypedSourcesTuple>;
}
