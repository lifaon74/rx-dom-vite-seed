import { IObjectType, IObjectTypeProperty } from '../../../types/object/object-type.type';
import { jbson_decode_size } from '../../shared/size/jbson-decode-size';
import { ReadFunction } from '../../shared/types/read-function.type';
import { jbson_decode_object_type_property } from './jbson-decode-object-type-property';

export function jbson_decode_object_type(
  read: ReadFunction,
): IObjectType {
  const length: number = jbson_decode_size(read);
  const properties: IObjectTypeProperty[] = new Array<IObjectTypeProperty>(length);
  for (let i = 0; i < length; i++) {
    properties[i] = jbson_decode_object_type_property(read);
  }
  return {
    type: 'object',
    properties,
  };
}
