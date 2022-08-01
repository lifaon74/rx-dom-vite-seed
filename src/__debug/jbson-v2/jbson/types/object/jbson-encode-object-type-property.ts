import { IObjectTypeProperty } from '../../../types/object/object-type.type';
import { WriteFunction } from '../../shared/types/write-function.type';
import { jbson_encode_utf8_string } from '../../shared/utf8-string/jbson-encode-utf8-string';
import { jbson_encode_unknown_type } from '../unknown/jbson-encode-unknown-type';

export function jbson_encode_object_type_property(
  write: WriteFunction,
  property: IObjectTypeProperty,
): void {
  jbson_encode_utf8_string(write, property[0]);
  jbson_encode_unknown_type(write, property[1]);
}
