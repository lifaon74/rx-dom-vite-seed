import { IU8Type } from '../../../../types/number/u8/u8-type.type';
import { WriteFunction } from '../../../shared/types/write-function.type';
import { jbson_encode_uint8_array_bytes } from '../../../shared/uint8-array/jbson-encode-uint8-array-bytes';
import { DATA_VIEW_U8, DATA_VIEW_UINT8_ARRAY_U8 } from './data-view-u8.constant';

export function jbson_encode_u8_value(
  write: WriteFunction,
  type: IU8Type,
  input: number,
): void {
  DATA_VIEW_U8.setUint8(0, input);
  jbson_encode_uint8_array_bytes(write, DATA_VIEW_UINT8_ARRAY_U8);
}
