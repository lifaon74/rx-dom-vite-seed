import { IMapType } from '../../../types/map/map-type.type';
import { ReadFunction } from '../../shared/types/read-function.type';
import { jbson_decode_unknown_type } from '../unknown/jbson-decode-unknown-type';

export function jbson_decode_map_type(
  read: ReadFunction,
): IMapType {
  return {
    type: 'map',
    keyType: jbson_decode_unknown_type(read),
    valueType: jbson_decode_unknown_type(read),
  };
}
