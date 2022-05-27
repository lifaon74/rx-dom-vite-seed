import { ITypedSourcesMapEntriesTuple } from '../../types/typed-sources-map-entries-tuple.type';
import { ITypedSourcesMapEntriesFunction } from './typed-sources-map.entries.function';

export interface ITypedSourcesMapEntriesTrait<GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple> {
  entries: ITypedSourcesMapEntriesFunction<GTypedSourcesTuple>;
}
