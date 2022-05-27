import { ITypedSourcesMapEntriesTuple } from '../../types/typed-sources-map-entries-tuple.type';
import { ITypedSourcesMapGetSourceFunction } from './typed-sources-map.get-source.function';

export interface ITypedSourcesMapGetSourceTrait<GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple> {
  getSource: ITypedSourcesMapGetSourceFunction<GTypedSourcesTuple>;
}
