import { WriteFunction } from '../types/write-function.type';
import { jbson_encode_uint8_array } from '../uint8-array/jbson-encode-uint8-array';

export function jbson_encode_utf8_string(
  write: WriteFunction,
  input: string,
): void {
  jbson_encode_uint8_array(write, new TextEncoder().encode(input));
}
