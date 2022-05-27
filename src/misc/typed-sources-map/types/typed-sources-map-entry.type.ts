import { ITypedMapEntry } from '../../typed-map/types/typed-map-entry.type';


export type ITypedSourcesMapEntry<GName extends string, GValue> = ITypedMapEntry<GName, GValue>;

export type IGenericTypedSourcesMapEntry = ITypedSourcesMapEntry<string, any>;

