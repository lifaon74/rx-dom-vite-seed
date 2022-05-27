import { ITypedSourcesMapEntriesTuple } from '../../types/typed-sources-map-entries-tuple.type';
import { ITypedSourcesMapHasFunction } from './typed-sources-map.has.function';

export interface ITypedSourcesMapHasTrait<GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple> {
  has: ITypedSourcesMapHasFunction<GTypedSourcesTuple>;
}
