import { INullType } from '../../../types/null/null-type.type';
import { WriteFunction } from '../../shared/types/write-function.type';
import { NULL_TYPE_BYTE } from '../types.constant';

export function jbson_encode_null_type(
  write: WriteFunction,
  type: INullType,
): void {
  write(NULL_TYPE_BYTE);
}
