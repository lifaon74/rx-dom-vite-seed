import { ISetType } from '../../../types/set/set-type.type';
import { ReadFunction } from '../../shared/types/read-function.type';
import { jbson_decode_unknown_type } from '../unknown/jbson-decode-unknown-type';

export function jbson_decode_set_type(
  read: ReadFunction,
): ISetType {
  return {
    type: 'set',
    itemsType: jbson_decode_unknown_type(read),
  };
}
