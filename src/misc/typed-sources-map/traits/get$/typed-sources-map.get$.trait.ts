import { ITypedSourcesMapEntriesTuple } from '../../types/typed-sources-map-entries-tuple.type';
import { ITypedSourcesMapGet$Function } from './typed-sources-map.get$.function';

export interface ITypedSourcesMapGet$Trait<GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple> {
  get$: ITypedSourcesMapGet$Function<GTypedSourcesTuple>;
}
