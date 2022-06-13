/*------------------------*/

/*
WITH TYPED DATA
 */
/*--------*/

// interface IType<GType extends string> {
//   type: GType;
// }

interface IType {
  type: string;
}

interface IUnionType {
  type: 'union';
  types: readonly IType[];
}

// const UNION_TYPE: IUnionType = {
//   type: 'union',
// };

function isUnionType(
  value: IType,
): value is IUnionType {
  return (value.type === 'union');
}

// interface IUnknownType {
//   type: 'unknown';
// }
//
// const UNKNOWN_TYPE: IUnknownType = {
//   type: 'unknown',
// };

interface INullType {
  type: 'null';
}

const NULL_TYPE: INullType = {
  type: 'null',
};

function isNullType(
  value: IType,
): value is INullType {
  return (value.type === 'null');
}

interface IUndefinedType {
  type: 'undefined';
}

const UNDEFINED_TYPE: IUndefinedType = {
  type: 'undefined',
};

function isUndefinedType(
  value: IType,
): value is IUndefinedType {
  return (value.type === 'undefined');
}

interface IBooleanType {
  type: 'boolean';
}

const BOOLEAN_TYPE: IBooleanType = {
  type: 'boolean',
};

function isBooleanType(
  value: IType,
): value is IBooleanType {
  return (value.type === 'boolean');
}

interface IU8Type {
  type: 'u8';
}

const U8_TYPE: IU8Type = {
  type: 'u8',
};

function isU8Type(
  value: IType,
): value is IU8Type {
  return (value.type === 'u8');
}

interface IU16Type {
  type: 'u16';
}

const U16_TYPE: IU16Type = {
  type: 'u16',
};

function isU16Type(
  value: IType,
): value is IU16Type {
  return (value.type === 'u16');
}

interface IU32Type {
  type: 'u32';
}

const U32_TYPE: IU32Type = {
  type: 'u32',
};

function isU32Type(
  value: IType,
): value is IU32Type {
  return (value.type === 'u32');
}

interface II8Type {
  type: 'i8';
}

const I8_TYPE: II8Type = {
  type: 'i8',
};

function isI8Type(
  value: IType,
): value is II8Type {
  return (value.type === 'i8');
}

interface II16Type {
  type: 'i16';
}

const I16_TYPE: II16Type = {
  type: 'i16',
};

function isI16Type(
  value: IType,
): value is II16Type {
  return (value.type === 'i16');
}


interface II32Type {
  type: 'i32';
}

const I32_TYPE: II32Type = {
  type: 'i32',
};

function isI32Type(
  value: IType,
): value is II32Type {
  return (value.type === 'i32');
}

interface IF64Type {
  type: 'f64';
}

const F64_TYPE: IF64Type = {
  type: 'f64',
};

function isF64Type(
  value: IType,
): value is IF64Type {
  return (value.type === 'f64');
}

type INumberType =
  | IU8Type
  | IU16Type
  | IU32Type
  | II8Type
  | II16Type
  | II32Type
  | IF64Type
  ;

function isNumberType(
  value: IType,
): value is INumberType {
  return isU8Type(value)
    || isU16Type(value)
    || isU32Type(value)
    || isI8Type(value)
    || isI16Type(value)
    || isI32Type(value)
    || isF64Type(value)
    ;
}


interface IStringType {
  type: 'string';
}

const STRING_TYPE: IStringType = {
  type: 'string',
};

function isStringType(
  value: IType,
): value is IStringType {
  return (value.type === 'string');
}

interface IArrayType {
  type: 'array';
  itemsType: IType;
}

type IObjectTypeProperty = [
  key: string,
  type: IType,
];

interface IObjectType {
  type: 'object';
  properties: readonly IObjectTypeProperty[];
  // properties: ReadonlyMap<string, IGenericType>;
}

function isObjectType(
  value: IType,
): value is IObjectType {
  return (value.type === 'object');
}

/*------------------------*/

// function coerceNumberTypes(
//   { type: typeA }: INumberType,
//   { type: typeB }: INumberType,
// ): IType  {
//   switch (typeA) {
//     case 'u8': {
//       switch (typeB) {
//         case 'u8':
//           return U8_TYPE;
//         case 'u16':
//           return U16_TYPE;
//         case 'u32':
//           return U32_TYPE;
//         case 'i8':
//           return I16_TYPE;
//         case 'i16':
//           return I32_TYPE;
//         case 'i32':
//         case 'f64':
//           return F64_TYPE;
//       }
//     }
//     case 'u16': {
//       switch (typeB) {
//         case 'u8':
//         case 'u16':
//           return U16_TYPE;
//         case 'u32':
//           return U32_TYPE;
//         case 'i8':
//         case 'i16':
//           return I32_TYPE;
//         case 'i32':
//         case 'f64':
//           return F64_TYPE;
//       }
//     }
//     case 'u32': {
//       switch (typeB) {
//         case 'u8':
//         case 'u16':
//         case 'u32':
//           return U32_TYPE;
//         case 'i8':
//         case 'i16':
//         case 'i32':
//         case 'f64':
//           return F64_TYPE;
//       }
//     }
//     case 'i8': {
//       switch (typeB) {
//         case 'u8':
//           return I16_TYPE;
//         case 'u16':
//           return I32_TYPE;
//         case 'u32':
//           return F64_TYPE;
//         case 'i8':
//           return I8_TYPE;
//         case 'i16':
//           return I16_TYPE;
//         case 'i32':
//           return I32_TYPE;
//         case 'f64':
//           return F64_TYPE;
//       }
//     }
//     case 'i16': {
//       switch (typeB) {
//         case 'u8':
//           return I32_TYPE;
//         case 'u16':
//         case 'u32':
//           return F64_TYPE;
//         case 'i8':
//         case 'i16':
//           return I16_TYPE;
//         case 'i32':
//           return I32_TYPE;
//         case 'f64':
//           return F64_TYPE;
//       }
//     }
//     case 'i32': {
//       switch (typeB) {
//         case 'u8':
//         case 'u16':
//         case 'u32':
//           return F64_TYPE;
//         case 'i8':
//         case 'i16':
//         case 'i32':
//           return I32_TYPE;
//         case 'f64':
//           return F64_TYPE;
//       }
//     }
//     case 'f64':
//       return F64_TYPE;
//   }
// }

// function appendTypeToUnionType(
//   typeA: IUnionType,
//   typeB: IType,
// ): IUnionType {
//   return {
//     type: 'union',
//     types: [
//       ...typeA.types,
//       (typeB.type === 'union'),
//     ],
//   };
// }

function appendTypeUnionTypes(
  types: IType[],
  type: IType,
): void {
  if (types.every((_type: IType) => (_type !== type))) { // TODO weak comparison
    types.push(type);
  }
}

function coerceUnionTypeWithUnknownType(
  typeA: IUnionType,
  typeB: IType,
): IUnionType {
  const types: IType[] = typeA.types.slice();
  if (isUnionType(typeB)) {
    for (let i = 0, l = typeB.types.length; i < l; i++) {
      appendTypeUnionTypes(types, typeB.types[i]);
    }
  } else {
    appendTypeUnionTypes(types, typeB);
  }
  return {
    type: 'union',
    types,
  };
}

// function coerceU8TypeWithUnknownType(
//   typeA: IU8Type,
//   typeB: IType,
// ): IType {
//   if (isU8Type(typeB)) {
//     return U8_TYPE;
//   } else if (isU16Type(typeB)) {
//     return U16_TYPE;
//   } else if (isU32Type(typeB)) {
//     return U32_TYPE;
//   } else if (isI8Type(typeB)) {
//     return I16_TYPE;
//   } else if (isI16Type(typeB)) {
//     return I32_TYPE;
//   } else if (isI32Type(typeB)) {
//     return F64_TYPE;
//   } else if (isF64Type(typeB)) {
//     return F64_TYPE;
//   } else {
//     throw 'TODO';
//   }
// }
//
// function coerceU16TypeWithUnknownType(
//   typeA: IU16Type,
//   typeB: IType,
// ): IType {
//   if (isU8Type(typeB)) {
//     return U16_TYPE;
//   } else if (isU16Type(typeB)) {
//     return U16_TYPE;
//   } else if (isU32Type(typeB)) {
//     return U32_TYPE;
//   } else if (isI8Type(typeB)) {
//     return I32_TYPE;
//   } else if (isI16Type(typeB)) {
//     return I32_TYPE;
//   } else if (isI32Type(typeB)) {
//     return F64_TYPE;
//   } else if (isF64Type(typeB)) {
//     return F64_TYPE;
//   } else {
//     throw 'TODO';
//   }
// }
//
// function coerceU32TypeWithUnknownType(
//   typeA: IU32Type,
//   typeB: IType,
// ): IType {
//   if (isU8Type(typeB)) {
//     return U32_TYPE;
//   } else if (isU16Type(typeB)) {
//     return U32_TYPE;
//   } else if (isU32Type(typeB)) {
//     return U32_TYPE;
//   } else if (isI8Type(typeB)) {
//     return F64_TYPE;
//   } else if (isI16Type(typeB)) {
//     return F64_TYPE;
//   } else if (isI32Type(typeB)) {
//     return F64_TYPE;
//   } else if (isF64Type(typeB)) {
//     return F64_TYPE;
//   } else {
//     throw 'TODO';
//   }
// }
//
// function coerceI8TypeWithUnknownType(
//   typeA: II8Type,
//   typeB: IType,
// ): IType {
//   switch (typeB.type) {
//     case 'u8':
//       return I16_TYPE;
//     case 'u16':
//       return I32_TYPE;
//     case 'u32':
//       return F64_TYPE;
//     case 'i8':
//       return I8_TYPE;
//     case 'i16':
//       return I16_TYPE;
//     case 'i32':
//       return I32_TYPE;
//     case 'f64':
//       return F64_TYPE;
//     default:
//       return UNION_TYPE;
//   }
// }
//
// function coerceI16TypeWithUnknownType(
//   typeA: II16Type,
//   typeB: IType,
// ): IType {
//   switch (typeB.type) {
//     case 'u8':
//       return I32_TYPE;
//     case 'u16':
//     case 'u32':
//       return F64_TYPE;
//     case 'i8':
//     case 'i16':
//       return I16_TYPE;
//     case 'i32':
//       return I32_TYPE;
//     case 'f64':
//       return F64_TYPE;
//     default:
//       return UNION_TYPE;
//   }
// }
//
// function coerceI32TypeWithUnknownType(
//   typeA: II32Type,
//   typeB: IType,
// ): IType {
//   switch (typeB.type) {
//     case 'u8':
//     case 'u16':
//     case 'u32':
//       return F64_TYPE;
//     case 'i8':
//     case 'i16':
//     case 'i32':
//       return I32_TYPE;
//     case 'f64':
//       return F64_TYPE;
//     default:
//       return UNION_TYPE;
//   }
// }
//
// function coerceF64TypeWithUnknownType(
//   typeA: IF64Type,
//   typeB: IType,
// ): IType {
//   switch (typeB.type) {
//     case 'u8':
//     case 'u16':
//     case 'u32':
//     case 'i8':
//     case 'i16':
//     case 'i32':
//     case 'f64':
//       return F64_TYPE;
//     default:
//       return UNION_TYPE;
//   }
// }
//
// function coerceTypes(
//   typeA: IType,
//   typeB: IType,
// ): IType {
//   switch (typeA.type) {
//     case 'u8':
//       return coerceU8TypeWithUnknownType(typeA as IU8Type, typeB);
//     case 'u16':
//       return coerceU16TypeWithUnknownType(typeA as IU16Type, typeB);
//     case 'u32':
//       return coerceU32TypeWithUnknownType(typeA as IU32Type, typeB);
//     case 'i8':
//       return coerceI8TypeWithUnknownType(typeA as II8Type, typeB);
//     case 'i16':
//       return coerceI16TypeWithUnknownType(typeA as II16Type, typeB);
//     case 'i32':
//       return coerceI32TypeWithUnknownType(typeA as II32Type, typeB);
//     case 'f64':
//       return coerceF64TypeWithUnknownType(typeA as IF64Type, typeB);
//     default:
//       return UNION_TYPE;
//   }
// }

function coerceTypesList(
  types: readonly IType[],
): IType {
  return (types.length === 0)
    ? UNION_TYPE
    : types.reduce(coerceTypes, types[0]);
}

/*------------------------*/

function inferNumberType(
  input: number,
): INumberType {
  if (input >= 0) {
    if (input <= 0xff) {
      return U8_TYPE;
    } else if (input <= 0xffff) {
      return U16_TYPE;
    } else if (input <= 0xffffffff) {
      return U32_TYPE;
    } else {
      return F64_TYPE;
    }
  } else {
    if (input >= -0x7f) {
      return I8_TYPE;
    } else if (input >= -0x7fff) {
      return I16_TYPE;
    } else if (input >= -0x7fffffff) {
      return I32_TYPE;
    } else {
      return F64_TYPE;
    }
  }
}

function inferArrayType(
  input: readonly any[],
): IArrayType {
  return {
    type: 'array',
    itemsType: coerceTypesList(input.map(inferType)),
  };
}

function inferObjectType(
  input: object,
): IObjectType {
  return {
    type: 'object',
    properties: Object.entries(input)
      .map(([key, value]: [string, any]): IObjectTypeProperty => {
        return [
          key,
          inferType(value),
        ];
      })
      .sort((
        [a]: IObjectTypeProperty,
        [b]: IObjectTypeProperty,
      ): number => {
        return (a === b) ? 0 : ((a < b) ? -1 : 1);
      }),
  };
}

function inferType(
  input: unknown,
): IType {
  if (input === null) {
    return NULL_TYPE;
  } else if (input === void 0) {
    return UNDEFINED_TYPE;
  } else {
    switch (typeof input) {
      case 'boolean':
        return BOOLEAN_TYPE;
      case 'number':
        return inferNumberType(input);
      case 'string':
        return STRING_TYPE;
      case 'object': {
        if (Array.isArray(input)) {
          return inferArrayType(input);
        } else {
          return inferObjectType(input as object);
        }
      }
      default:
        throw new Error(`Unsupported type`);
    }
  }
}

/*------------------------*/

export type WriteFunction = (value: number) => void;
export type ReadFunction = () => number;

export function jbson_encode_size(
  size: number,
  write: WriteFunction,
): void {
  let byte: number;
  do {
    byte = (size & 0b01111111);
    size >>= 7;
    byte |= ((size !== 0) as any) << 7;
    write(byte);
  } while (size !== 0);
}

export function jbson_decode_size(
  read: ReadFunction,
): number {
  let size: number = 0;
  let byte: number;
  let offset: number = 0;
  do {
    byte = read();
    size |= (byte & 0b01111111) << offset;
    offset += 7;
  } while (byte & 0b10000000);
  return size;
}

export function jbson_encode_uint8_array_value(
  input: Uint8Array,
  write: WriteFunction,
): void {
  jbson_encode_size(input.length, write);
  for (let i = 0, l = input.length; i < l; i++) {
    write(input[i]);
  }
}

export function jbson_decode_uint8_array_value(
  read: ReadFunction,
): Uint8Array {
  const size: number = jbson_decode_size(read);
  const output: Uint8Array = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    output[i] = read();
  }
  return output;
}

const NULL_TYPE_BYTE = 0;
const UNDEFINED_TYPE_BYTE = 1;
const BOOLEAN_TYPE_BYTE = 2;
const U8_TYPE_BYTE = 3;
const U16_TYPE_BYTE = 4;
const U32_TYPE_BYTE = 5;
const I8_TYPE_BYTE = 6;
const I16_TYPE_BYTE = 7;
const I32_TYPE_BYTE = 8;
const F64_TYPE_BYTE = 9;
const STRING_TYPE_BYTE = 10;
const ARRAY_TYPE_BYTE = 11;
const OBJECT_TYPE_BYTE = 12;

export function jbson_encode_boolean_type(
  write: WriteFunction,
): void {
  write(BOOLEAN_TYPE_BYTE);
}

export function jbson_encode_boolean_value(
  input: boolean,
  write: WriteFunction,
): void {
  write(input ? 1 : 0);
}

/* U8 */

export function jbson_encode_u8_type(
  write: WriteFunction,
): void {
  write(U8_TYPE_BYTE);
}

export function jbson_encode_u8_value(
  input: number,
  write: WriteFunction,
): void {
  write(input);
}

/* STRING */

export function jbson_encode_string_type(
  write: WriteFunction,
): void {
  write(STRING_TYPE_BYTE);
}

export function jbson_encode_utf8_string_value(
  input: string,
  write: WriteFunction,
): void {
  jbson_encode_uint8_array_value(new TextEncoder().encode(input), write);
}

export function jbson_decode_utf8_string_value(
  read: ReadFunction,
): string {
  return new TextDecoder().decode(jbson_decode_uint8_array_value(read));
}

/* OBJECT */

export function jbson_encode_object_type(
  type: IObjectType,
  write: WriteFunction,
): void {
  write(OBJECT_TYPE_BYTE);
  jbson_encode_size(type.properties.length, write);
  for (let i = 0, l = type.properties.length; i < l; i++) {
    jbson_encode_object_type_property(type.properties[i], write);
  }
}

export function jbson_encode_object_type_property(
  property: IObjectTypeProperty,
  write: WriteFunction,
): void {
  jbson_encode_utf8_string_value(property[0], write);
  jbson_encode_unknown_type(property[1], write);
}

export function jbson_encode_object_value(
  type: IObjectType,
  input: object,
  write: WriteFunction,
): void {
  throw 'TODO';
}

/* UNKNOWN */

export function jbson_encode_unknown_type(
  type: IType,
  write: WriteFunction,
): void {
  switch (type.type) {
    case 'boolean':
      return jbson_encode_boolean_type(write);
    case 'u8':
      return jbson_encode_u8_type(write);
    case 'string':
      return jbson_encode_string_type(write);
    case 'object':
      return jbson_encode_object_type(type as IObjectType, write);
    default:
      throw new Error(`Unsupported type`);
  }
}

export function jbson_encode_unknown_value(
  type: IType,
  input: unknown,
  write: WriteFunction,
): void {
  if (isBooleanType(type)) {
    return jbson_encode_boolean_value(input as boolean, write);
  } else  if (isU8Type(type)) {
    return jbson_encode_u8_value(input as number, write);
  } else  if (isStringType(type)) {
    return jbson_encode_utf8_string_value(input as string, write);
  } else  if (isObjectType(type)) {
    return jbson_encode_object_value(type, input as object, write);
  } else {
    throw new Error(`Unsupported type`);
  }
}

/*------------------------*/

function jbson_encode_to_uin8_array(
  type: IType,
  input: unknown,
): Uint8Array {
  const array: Uint8Array = new Uint8Array(1e6);
  let i: number = 0;

  jbson_encode_unknown_type(type, (byte: number): void => {
    array[i++] = byte;
  });

  jbson_encode_unknown_value(type, input, (byte: number): void => {
    array[i++] = byte;
  });

  return array.subarray(0, i);
}

function debugJBSONV2_1(): void {
  // const input = true;
  // const input = 8;
  // const input = -8;
  // const input = 'abc';
  // const input = { b: 0, a: 'b' };
  const input = [0, 1, 2];

  const type = inferType(input);
  console.log(type);

  // const encoded = jbson_encode_to_uin8_array(type, input);
  // console.log(encoded);
}

/*------------------------*/

export function debugJBSONV2(): void {
  debugJBSONV2_1();
}
