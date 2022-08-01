import { inferUnknownType } from './infer/infer-unknown-type';
import { PointerMap } from './jbson/classes/pointer-map.class';
import { ReadFunction } from './jbson/shared/types/read-function.type';
import { WriteFunction } from './jbson/shared/types/write-function.type';
import { jbson_decode_unknown_type } from './jbson/types/unknown/jbson-decode-unknown-type';
import { jbson_decode_unknown_value } from './jbson/types/unknown/jbson-decode-unknown-value';
import { jbson_encode_unknown_type } from './jbson/types/unknown/jbson-encode-unknown-type';
import { jbson_encode_unknown_value } from './jbson/types/unknown/jbson-encode-unknown-value';
import { IUnknownType } from './types/unknown/unknown-type.type';

/*-----------------*/

function createWriteFunctionFromUint8Array<GResult>(
  array: Uint8Array,
  callback: (write: WriteFunction) => GResult,
): [Uint8Array, GResult] {
  const length: number = array.length;
  let i: number = 0;

  const result: GResult = callback((byte: number): void => {
    if (i < length) {
      array[i++] = byte;
    } else {
      throw new Error(`Full: tried to write data on a full Uint8Array`);
    }
  });

  return [
    array.subarray(0, i),
    result,
  ];
}

function createReadFunctionFromUint8Array<GResult>(
  array: Uint8Array,
  callback: (read: ReadFunction) => GResult,
): [Uint8Array, GResult] {
  const length: number = array.length;
  let i: number = 0;

  const result: GResult = callback((): number => {
    if (i < length) {
      return array[i++];
    } else {
      throw new Error(`Empty: tried to read data on an empty Uint8Array`);
    }
  });

  return [
    array.subarray(i),
    result,
  ];
}

/* UNKNOWN */

function jbson_encode_unknown_input(
  write: WriteFunction,
  input: unknown,
): void {
  const type: IUnknownType = inferUnknownType(input, new Set());
  // console.log('type', type);
  jbson_encode_unknown_type_and_value(write, type, input);
}

function jbson_encode_unknown_type_and_value(
  write: WriteFunction,
  type: IUnknownType,
  input: unknown,
): void {
  jbson_encode_unknown_type(write, type);
  jbson_encode_unknown_value(write, type, input, new PointerMap());
}

function jbson_decode_unknown_output(
  read: ReadFunction,
): unknown {
  const type: IUnknownType = jbson_decode_unknown_type(read);
  // console.log('type', type);
  return jbson_decode_unknown_value(read, type, new PointerMap());
}

/*------------------------*/

function jbson_encode_to_uin8_array(
  input: unknown,
  array: Uint8Array = new Uint8Array(1e6),
): Uint8Array {
  return createWriteFunctionFromUint8Array(
    array,
    (
      write: WriteFunction,
    ): void => {
      jbson_encode_unknown_input(write, input);
    },
  )[0];
}

function jbson_decode_from_uin8_array(
  array: Uint8Array,
): [Uint8Array, unknown] {
  return createReadFunctionFromUint8Array(
    array,
    (
      read: ReadFunction,
    ): unknown => {
      return jbson_decode_unknown_output(read);
    },
  );
}

/*-------------------------*/

function debugJBSONV2_1(): void {
  // const input = true;
  // const input = 8;
  // const input = 0x100;
  // const input = 0x10000;
  // const input = -8;
  // const input = -0x100;
  // const input = -0x10000;
  // const input = -0.1;
  // const input = Number.NaN;
  // const input = Number.POSITIVE_INFINITY;
  // const input = 'abc';
  // const input = [0, 1];
  // const input = [0, 0xff];
  // const input = [-1, 0xff];
  // const input = [0, 1, 2, 4];
  // const input = [1, -1];
  // const input = [1, 0.1, -1];
  // const input = [1, -1, 'a'];
  // const input = [1, 'a', -1];
  // const input = [789, 'abc', true];
  // const input = ['abc', true, 1, -1];
  // const input = { b: 0, a: 'b' };
  // const input = [[1], [1]];
  // const input = [['a'], [1], [-1]];
  // const input = [{ a: 'a' }, { a: 'b' }];
  // const input = [{ a: 'a' }, { a: 2 }];
  // const input = { input: null as any };
  // input.input = input;
  // const input = { a: null as any, b: null as any };
  // input.a = input;
  // input.b = input;
  // const a = { a: 1 };
  // const input = [a, a, a, a, a, a];
  // const input = [a, a, 1, a];
  // const input = new Uint8Array([1, 2, 3]);
  // const input = new Int8Array([1, 2, 3]);
  // const input = new Uint16Array([1, 2, 3]);
  // const input = new Set([1, 2, 3]);
  const input = new Map([['a', 1], ['b', 2]]);
  // const input = JSON_SAMPLE_01;
  // const input = JSON_SAMPLE_02;
  // const input = JSON_SAMPLE_03;
  // const input = Array.from({ length: 1e6 }, (_, i) => i);
  // const input = Array.from({ length: 1e6 }, (_, i) => `#${i}`);

  const encoded = jbson_encode_to_uin8_array(input);
  console.log(encoded);

  const decoded = jbson_decode_from_uin8_array(encoded)[1];
  console.log(decoded);

  try {
    console.log('size ratio', encoded.length / JSON.stringify(input).length);
  } catch {
    console.log(`Unable to JSON.stringify`);
  }
}

/*------------------------*/

export function debugJBSONV2(): void {
  debugJBSONV2_1();
}
