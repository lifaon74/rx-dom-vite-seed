import { IStringType } from '../../../types/string/string-type.type';
import { WriteFunction } from '../../shared/types/write-function.type';
import { jbson_encode_utf8_string } from '../../shared/utf8-string/jbson-encode-utf8-string';

export function jbson_encode_string_value(
  write: WriteFunction,
  type: IStringType,
  input: string,
): void {
  jbson_encode_utf8_string(write, input);
}
