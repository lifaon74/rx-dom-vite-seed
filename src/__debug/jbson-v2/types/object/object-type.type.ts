import { IUnknownType } from '../unknown/unknown-type.type';

export type IObjectTypeProperty<GType extends IUnknownType = IUnknownType> = [
  key: string,
  type: GType,
];

export interface IObjectType {
  type: 'object';
  properties: readonly IObjectTypeProperty[];
}
