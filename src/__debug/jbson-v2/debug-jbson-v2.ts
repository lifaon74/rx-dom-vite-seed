import { jbson_decode_from_uin8_array, jbson_encode_to_uin8_array } from '../../../../jbson/dist';
import { JSON_SAMPLE_01 } from './samples/01';

function debugJBSONV2_1(): void {
  // const input = true;
  // const input = 8;
  // const input = 0x100;
  // const input = 0x10000;
  // const input = 2**33;
  // const input = -8;
  // const input = -0x100;
  // const input = -0x10000;
  // const input = -0.1;
  // const input = Number.NaN;
  // const input = Number.POSITIVE_INFINITY;
  // const input = 123456789n;
  // const input = 'abc';
  // const input = [0, 1];
  const input = [0, 1n];
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
  // const input = new Uint16Array([1, 2, 3, 256]);
  // const input = new BigUint64Array([5n]);
  // const input = new Set([1, 2, 3]);
  // const input = new Map([['a', 1], ['b', 2]]);
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
