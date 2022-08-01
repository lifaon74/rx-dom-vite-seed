import { IPointerType } from '../../../types/pointer/pointer-type.type';
import { PointerMap } from '../../classes/pointer-map.class';
import { jbson_decode_size } from '../../shared/size/jbson-decode-size';
import { ReadFunction } from '../../shared/types/read-function.type';

export function jbson_decode_pointer_value(
  read: ReadFunction,
  type: IPointerType,
  pointerMap: PointerMap,
): unknown {
  return pointerMap.getValue(jbson_decode_size(read));
}
