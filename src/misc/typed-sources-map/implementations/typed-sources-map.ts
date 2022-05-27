import { ITypedSourcesMapTraitsCollection } from '../traits/typed-sources-map.traits-collection';
import { ITypedSourcesMapEntriesTuple } from '../types/typed-sources-map-entries-tuple.type';

export type ITypedSourcesMap<GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple> = ITypedSourcesMapTraitsCollection<GTypedSourcesTuple>;
