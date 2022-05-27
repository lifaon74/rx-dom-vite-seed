import { ITypedSourcesMapEntriesTuple } from '../types/typed-sources-map-entries-tuple.type';
import { ITypedSourcesMapEntriesTrait } from './entries/typed-sources-map.entries.trait';
import { ITypedSourcesMapGet$Trait } from './get$/typed-sources-map.get$.trait';
import { ITypedSourcesMapGetSourceTrait } from './get-source/typed-sources-map.get-source.trait';
import { ITypedSourcesMapGetTrait } from './get/typed-sources-map.get.trait';
import { ITypedSourcesMapHasTrait } from './has/typed-sources-map.has.trait';
import { ITypedSourcesMap$SetTrait } from './$set/typed-sources-map.$set.trait';
import { ITypedSourcesMapSetTrait } from './set/typed-sources-map.set.trait';

export interface ITypedSourcesMapTraitsCollection<GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple> extends //
  ITypedSourcesMap$SetTrait<GTypedSourcesTuple>,
  ITypedSourcesMapEntriesTrait<GTypedSourcesTuple>,
  ITypedSourcesMapGetTrait<GTypedSourcesTuple>,
  ITypedSourcesMapGet$Trait<GTypedSourcesTuple>,
  ITypedSourcesMapGetSourceTrait<GTypedSourcesTuple>,
  ITypedSourcesMapHasTrait<GTypedSourcesTuple>,
  ITypedSourcesMapSetTrait<GTypedSourcesTuple>
  //
{}
