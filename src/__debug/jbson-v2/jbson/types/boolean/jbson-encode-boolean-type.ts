import { IBooleanType } from '../../../types/boolean/boolean-type.type';
import { WriteFunction } from '../../shared/types/write-function.type';
import { BOOLEAN_TYPE_BYTE } from '../types.constant';

export function jbson_encode_boolean_type(
  write: WriteFunction,
  type: IBooleanType,
): void {
  write(BOOLEAN_TYPE_BYTE);
}
