import { isAlternativeType } from '../../../types/alternative/is-alternative-type';
import { isArrayType } from '../../../types/array/is-array-type';
import { isBooleanType } from '../../../types/boolean/is-boolean-type';
import { isMapType } from '../../../types/map/is-map-type';
import { isNullType } from '../../../types/null/is-null-type';
import { isF64Type } from '../../../types/number/f64/is-f64-type';
import { isI16Type } from '../../../types/number/i16/is-i16-type';
import { isI32Type } from '../../../types/number/i32/is-i32-type';
import { isI8Type } from '../../../types/number/i8/is-i8-type';
import { isU16Type } from '../../../types/number/u16/is-u16-type';
import { isU32Type } from '../../../types/number/u32/is-u32-type';
import { isU8Type } from '../../../types/number/u8/is-u8-type';
import { isObjectType } from '../../../types/object/is-object-type';
import { isPointerType } from '../../../types/pointer/is-pointer-type';
import { isSetType } from '../../../types/set/is-set-type';
import { isStringType } from '../../../types/string/is-string-type';
import { isI8ArrayType } from '../../../types/typed-array/i8/is-i8-array-type';
import { isU8ArrayType } from '../../../types/typed-array/u8/is-u8-array-type';
import { isUndefinedType } from '../../../types/undefined/is-undefined-type';
import { isUnionType } from '../../../types/union/is-union-type';
import { IUnknownType } from '../../../types/unknown/unknown-type.type';
import { PointerMap } from '../../classes/pointer-map.class';
import { WriteFunction } from '../../shared/types/write-function.type';
import { jbson_encode_alternative_value } from '../alternative/jbson-encode-alternative-value';
import { jbson_encode_array_value } from '../array/jbson-encode-array-value';
import { jbson_encode_boolean_value } from '../boolean/jbson-encode-boolean-value';
import { jbson_encode_map_value } from '../map/jbson-encode-map-value';
import { jbson_encode_null_value } from '../null/jbson-encode-null-value';
import { jbson_encode_f64_value } from '../number/f64/jbson-encode-f64-value';
import { jbson_encode_i16_value } from '../number/i16/jbson-encode-i16-value';
import { jbson_encode_i32_value } from '../number/i32/jbson-encode-i32-value';
import { jbson_encode_i8_value } from '../number/i8/jbson-encode-i8-value';
import { jbson_encode_u16_value } from '../number/u16/jbson-encode-u16-value';
import { jbson_encode_u32_value } from '../number/u32/jbson-encode-u32-value';
import { jbson_encode_u8_value } from '../number/u8/jbson-encode-u8-value';
import { jbson_encode_object_value } from '../object/jbson-encode-object-value';
import { jbson_encode_pointer_value } from '../pointer/jbson-encode-pointer-value';
import { jbson_encode_set_value } from '../set/jbson-encode-set-value';
import { jbson_encode_string_value } from '../string/jbson-encode-string-value';
import { jbson_encode_i8_array_value } from '../typed-array/i8/jbson-encode-i8-array-value';
import { jbson_encode_u8_array_value } from '../typed-array/u8/jbson-encode-u8-array-value';
import { jbson_encode_undefined_value } from '../undefined/jbson-encode-undefined-value';
import { jbson_encode_union_value } from '../union/jbson-encode-union-value';

export function jbson_encode_unknown_value(
  write: WriteFunction,
  type: IUnknownType,
  input: unknown,
  pointerMap: PointerMap,
): void {
  if (isAlternativeType(type)) {
    return jbson_encode_alternative_value(write, type, input as unknown, pointerMap);
  } else if (isUnionType(type)) {
    return jbson_encode_union_value(write, type, input as unknown, pointerMap);
  } else if (isUndefinedType(type)) {
    return jbson_encode_undefined_value(write, type, input as undefined);
  } else if (isNullType(type)) {
    return jbson_encode_null_value(write, type, input as null);
  } else if (isBooleanType(type)) {
    return jbson_encode_boolean_value(write, type, input as boolean);
  } else if (isU8Type(type)) {
    return jbson_encode_u8_value(write, type, input as number);
  } else if (isU16Type(type)) {
    return jbson_encode_u16_value(write, type, input as number);
  } else if (isU32Type(type)) {
    return jbson_encode_u32_value(write, type, input as number);
  } else if (isI8Type(type)) {
    return jbson_encode_i8_value(write, type, input as number);
  } else if (isI16Type(type)) {
    return jbson_encode_i16_value(write, type, input as number);
  } else if (isI32Type(type)) {
    return jbson_encode_i32_value(write, type, input as number);
  } else if (isF64Type(type)) {
    return jbson_encode_f64_value(write, type, input as number);
  } else if (isU8ArrayType(type)) {
    return jbson_encode_u8_array_value(write, type, input as Uint8Array);
    // } else if (isU16ArrayType(typeA)) {
    //   return compareU16ArrayType(typeA, typeB);
    // } else if (isU32ArrayType(typeA)) {
    //   return compareU32ArrayType(typeA, typeB);
    // } else if (isU64ArrayType(typeA)) {
    //   return compareU64ArrayType(typeA, typeB);
  } else if (isI8ArrayType(type)) {
    return jbson_encode_i8_array_value(write, type, input as Int8Array);
    // } else if (isI16ArrayType(typeA)) {
    //   return compareI16ArrayType(typeA, typeB);
    // } else if (isI32ArrayType(typeA)) {
    //   return compareI32ArrayType(typeA, typeB);
    // } else if (isI64ArrayType(typeA)) {
    //   return compareI64ArrayType(typeA, typeB);
    // } else if (isF32ArrayType(typeA)) {
    //   return compareF32ArrayType(typeA, typeB);
    // } else if (isF64ArrayType(typeA)) {
    //   return compareF64ArrayType(typeA, typeB);
  } else if (isStringType(type)) {
    return jbson_encode_string_value(write, type, input as string);
  } else if (isArrayType(type)) {
    return jbson_encode_array_value(write, type, input as readonly unknown[], pointerMap);
  } else if (isSetType(type)) {
    return jbson_encode_set_value(write, type, input as ReadonlySet<unknown>, pointerMap);
  } else if (isObjectType(type)) {
    return jbson_encode_object_value(write, type, input as object, pointerMap);
  } else if (isMapType(type)) {
    return jbson_encode_map_value(write, type, input as ReadonlyMap<unknown, unknown>, pointerMap);
  } else if (isPointerType(type)) {
    return jbson_encode_pointer_value(write, type, input as object, pointerMap);
  } else {
    throw new Error(`Unsupported type`);
  }
}
