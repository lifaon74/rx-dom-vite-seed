import { IArrayType } from '../../../types/array/array-type.type';
import { ReadFunction } from '../../shared/types/read-function.type';
import { jbson_decode_unknown_type } from '../unknown/jbson-decode-unknown-type';

export function jbson_decode_array_type(
  read: ReadFunction,
): IArrayType {
  return {
    type: 'array',
    itemsType: jbson_decode_unknown_type(read),
  };
}
