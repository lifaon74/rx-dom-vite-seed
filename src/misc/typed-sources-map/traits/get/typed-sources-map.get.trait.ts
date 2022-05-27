import { ITypedSourcesMapEntriesTuple } from '../../types/typed-sources-map-entries-tuple.type';
import { ITypedSourcesMapGetFunction } from './typed-sources-map.get.function';

export interface ITypedSourcesMapGetTrait<GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple> {
  get: ITypedSourcesMapGetFunction<GTypedSourcesTuple>;
}
