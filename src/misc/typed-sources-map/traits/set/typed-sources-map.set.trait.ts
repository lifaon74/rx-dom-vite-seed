import { ITypedSourcesMapEntriesTuple } from '../../types/typed-sources-map-entries-tuple.type';
import { ITypedSourcesMapSetFunction } from './typed-sources-map.set.function';

export interface ITypedSourcesMapSetTrait<GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple> {
  set: ITypedSourcesMapSetFunction<GTypedSourcesTuple>;
}
