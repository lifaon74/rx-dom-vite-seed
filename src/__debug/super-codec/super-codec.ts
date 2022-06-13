import {
  COMPLETE,
  COMPLETE_ENCODER,
  IDecode,
  IDecoder,
  IDecoderReturn,
  IEncode,
  IEncoder,
  IEncoderReturn,
  INCOMPLETE,
} from './types/types';

/*
Encoder:

- takes a value
- returns a PULL source of Result { done: boolean: value: u8 }

const encoder = encode({ toto })
byte[0] = encoder.next().value;
byte[1] = encoder.next().value;
...

=> converts ONE thing to MANY things


Decoder:

- push SINK of u8
- provides a Result: { done: boolean: value: GValue }

const decoder = decode()
decoder.next(byte[0]);
const value = encoder.next(byte[0]).value;
...

=> converts MANY things to ONE thing

 */

/*----------------*/

export type u8 = number;

/*----------------*/

const encodeStringToU8: IEncode<string, u8> = (
  input: string,
): IEncoder<u8> => {
  let i: number = 0;

  if (!input.endsWith('\0')) {
    input += '\0';
  }

  return (): IEncoderReturn<u8> => {
    if (i < input.length) {
      return input.charCodeAt(i++);
    } else {
      return COMPLETE;
    }
  };
};

const u8ToString: IDecode<u8, string> = (): IDecoder<u8, string> => {
  let output: string = '';

  return (
    value: u8,
  ): IDecoderReturn<string> => {
    if (value === 0) {
      return output;
    } else {
      output += String.fromCharCode(value);
      return INCOMPLETE;
    }
  };
};

function encodeToUint8Array(
  encoder: IEncoder<u8>,
  data: Uint8Array = new Uint8Array(1e6),
): Uint8Array {
  let i: number = 0;
  let value: IEncoderReturn<u8>;
  while ((value = encoder()) !== COMPLETE) {
    data[i++] = value;
  }
  return data.subarray(0, i);
}

function decodeFromUint8Array<GValue>(
  decoder: IDecoder<u8, GValue>,
  data: Uint8Array,
): [GValue, Uint8Array] {
  let i: number = 0;
  let value: IDecoderReturn<GValue>;
  while ((value = decoder(data[i++])) === INCOMPLETE) {
  }
  return [
    value,
    data.subarray(i),
  ];
}

function codec<GValue, GEncoded>(
  value: GValue,
  encode: IEncode<GValue, GEncoded>,
  decode: IDecode<GEncoded, GValue>,
  compareValue: boolean = false,
): void {
  const encoder: IEncoder<GEncoded> = encode(value);
  const decoder: IDecoder<GEncoded, GValue> = decode();

  let encodedValue: IEncoderReturn<GEncoded>;
  let decodedValue: IDecoderReturn<GValue>;

  do {
    encodedValue = encoder();
    if (encodedValue === COMPLETE) {
      throw new Error(`Encoder finished before Decoder finished`);
    } else {
      decodedValue = decoder(encodedValue);
    }
  } while (decodedValue === INCOMPLETE);

  if (encoder() !== COMPLETE) {
    throw new Error(`Decoder finished before Encoder finished`);
  } else if (compareValue && (decodedValue !== value)) {
    throw new Error(`Decoded value is different than encoded value`);
  }

  console.log(value);
  console.log(decodedValue);
}

/*----------------*/

function debugSuperCodec1(): void {
  const encoder = encodeStringToU8('abc');
  const data = encodeToUint8Array(encoder);
  console.log(data);

  const decoder = u8ToString();
  const [value, _data] = decodeFromUint8Array(decoder, data);
  console.log(value, _data);
}

/*----------------*/

export function jbson_size_encoder_statement(
  size: number,
): IEncoderStatement<u8> {
  return do_while_encoder_statement<u8>(
    (): IEncoder<u8> => {
      let byte: number = (size & 0b01111111);
      size >>= 7;
      byte |= ((size !== 0) as any) << 7;
      return value_encoder<u8>(byte);
    },
    () => (size !== 0),
  );
}

export function jbson_size_decoder(): IDecoder<u8, number> {
  let next: IDecoder<u8, number>;
  let size: number;
  let offset: number;

  const next0 = (
    byte: u8,
  ): IDecoderReturn<number> => {
    size = 0;
    offset = 0;
    next = next1;
    return next(byte);
  };

  const next1 = (
    byte: u8,
  ): IDecoderReturn<number> => {
    size |= (byte & 0b01111111) << offset;
    if (byte & 0b10000000) {
      offset += 7;
      return INCOMPLETE;
    } else {
      next = next2;
      return next(byte);
    }
  };

  const next2 = (): IDecoderReturn<number> => {
    return size;
  };

  next = next0;

  return (value: u8): IDecoderReturn<number> => next(value);
}

// export function jbson_size_decoder(): IDecoder<u8, number> {
//   let next: IDecoder<u8, number>;
//   let size: number;
//   let offset: number;
//
//   const next0 = (
//     byte: u8,
//   ): IDecoderReturn<number> => {
//     size = 0;
//     offset = 0;
//     next = next1;
//     return next(byte);
//   };
//
//   const next1 = (
//     byte: u8,
//   ): IDecoderReturn<number> => {
//     size |= (byte & 0b01111111) << offset;
//     if (byte & 0b10000000) {
//       offset += 7;
//       return INCOMPLETE;
//     } else {
//       next = next2;
//       return next(byte);
//     }
//   };
//
//   const next2 = (): IDecoderReturn<number> => {
//     return size;
//   };
//
//   next = next0;
//
//   return (value: u8): IDecoderReturn<number> => next(value);
// }

/*---*/

export function jbson_uint8_array_encoder_statement(
  array: Uint8Array,
): IEncoderStatement<u8> {
  return chain_encoder_statements_as_statement<u8>([
    jbson_size_encoder_statement(array.length),
    () => array_encoder(array),
  ]);
}

export function jbson_decode_uint8_array(): IDecoder<u8, Uint8Array> {
  let next: IDecoder<u8, Uint8Array>;
  let sizeDecoder: IDecoder<u8, number>;
  let size: IDecoderReturn<number>;
  let array: IDecoderReturn<Uint8Array>;

  const next0 = (
    byte: u8,
  ): IDecoderReturn<Uint8Array> => {
    sizeDecoder = jbson_size_decoder();
    return next(byte);
  };

  const next1 = (
    byte: u8,
  ): IDecoderReturn<Uint8Array> => {
    size = sizeDecoder(byte);
    if (size === INCOMPLETE) {
      return INCOMPLETE;
    } else {

    }
  };

  const next2 = (
    byte: u8,
  ): IDecoderReturn<Uint8Array> => {
    size = sizeDecoder(byte);
    if (size === INCOMPLETE) {
      return INCOMPLETE;
    } else {

    }
  };

  const next5 = (): IDecoderReturn<Uint8Array> => {
    return array;
  };

  next = next0;

  return (value: u8): IDecoderReturn<Uint8Array> => next(value);
}

/*---*/

function encode<GOut>(
  encoder: IEncoder<GOut>,
  write: (value: GOut) => void,
): void {
  let value: IEncoderReturn<GOut>;
  while ((value = encoder()) !== COMPLETE) {
    write(value);
  }
}

function encode_to_array<GOut>(
  encoder: IEncoder<GOut>,
): GOut[] {
  const array: GOut[] = [];
  encode(encoder, (value: GOut): void => {
    array.push(value);
  });
  return array;
}

function decode<GIn, GOut>(
  decoder: IDecoder<GIn, GOut>,
  read: () => GIn,
): GOut {
  let value: IDecoderReturn<GOut>;
  while ((value = decoder(read())) === INCOMPLETE) {
  }
  return value;
}

function decode_from_array<GIn, GOut>(
  decoder: IDecoder<GIn, GOut>,
  array: ArrayLike<GIn>,
): [GOut, number] {
  let i: number = 0;
  const value: GOut = decode(decoder, (): GIn => {
    return array[i++];
  });
  return [
    value,
    i,
  ];
}

/*---*/

interface IEncoderStatement<GOut> {
  (): IEncoder<GOut>;
}

function context_proxy<GContext extends object>(
  contexts: readonly object[],
): GContext {
  const map = new Map<PropertyKey, object>(
    contexts.flatMap((context: object) => {
      return Object.keys(context).map((key: string): [string, object] => {
        return [
          key,
          context,
        ];
      });
    }),
  );

  return new Proxy<GContext>({} as any, {
    get(
      target: GContext,
      propertyKey: PropertyKey,
      receiver: any,
    ): any {
      if (map.has(propertyKey)) {
        return Reflect.get(map.get(propertyKey)!, propertyKey);
        // return map.get(propertyKey)![propertyKey];
      } else {
        return void 0;
      }
    },
    set(
      target: GContext,
      propertyKey: PropertyKey,
      value: any,
      receiver: any,
    ): any {
      if (map.has(propertyKey)) {
        return Reflect.set(map.get(propertyKey)!, propertyKey, value);
        // return map.get(propertyKey)![propertyKey];
      } else {
        return false;
      }
    },
    has(
      target: GContext,
      propertyKey: PropertyKey,
    ): boolean {
      if (map.has(propertyKey)) {
        return Reflect.has(map.get(propertyKey)!, propertyKey);
      } else {
        return false;
      }
    },
    ownKeys(
      target: GContext,
    ): ArrayLike<string | symbol> {
      return contexts.flatMap((context: object): (string | symbol)[] => {
        return Reflect.ownKeys(context);
      });
    },
  });
}

function chain_encoder_statements_as_encoder<GOut>(
  statements: readonly IEncoderStatement<GOut>[],
): IEncoder<GOut> {
  let next: IEncoder<GOut>;

  let i: number = 0;
  let encoder: IEncoder<GOut>;

  const next0 = (): IEncoderReturn<GOut> => {
    if (i < statements.length) {
      encoder = statements[i]();
      i++;
      next = next1;
    } else {
      next = COMPLETE_ENCODER;
    }
    return next();
  };

  const next1 = (): IEncoderReturn<GOut> => {
    const result: IEncoderReturn<GOut> = encoder();
    if (result === COMPLETE) {
      next = next0;
      return next();
    } else {
      return result;
    }
  };

  next = next0;

  return (): IEncoderReturn<GOut> => next();
  // return chain_encoders<GOut>(statements.map((statement: IEncoderStatement<GOut>): IEncoder<GOut> => statement());
}

function chain_encoder_statements_as_statement<GOut>(
  statements: readonly IEncoderStatement<GOut>[],
): IEncoderStatement<GOut> {
  return () => chain_encoder_statements_as_encoder<GOut>(statements);
}

function array_encoder_statement<GOut>(
  values: ArrayLike<GOut>,
): IEncoderStatement<GOut> {
  return (): IEncoder<GOut> => array_encoder<GOut>(values);
}

function array_encoder<GOut>(
  values: ArrayLike<GOut>,
): IEncoder<GOut> {
  let i: number = 0;

  let next: IEncoder<GOut> = (): IEncoderReturn<GOut> => {
    if (i < values.length) {
      return values[i++];
    } else {
      next = COMPLETE_ENCODER;
      return next();
    }
  };

  return (): IEncoderReturn<GOut> => next();
}

function value_encoder<GOut>(
  value: GOut,
): IEncoder<GOut> {
  let next: IEncoder<GOut> = (): IEncoderReturn<GOut> => {
    next = COMPLETE_ENCODER;
    return value;
  };
  return (): IEncoderReturn<GOut> => next();
}

function while_encoder_statement<GOut>(
  condition: () => boolean,
  statement: IEncoderStatement<GOut>,
): IEncoderStatement<GOut> {
  const loop = (): IEncoder<GOut> => {
    if (condition()) {
      return chain_encoder_statements_as_encoder<GOut>([
        statement,
        loop,
      ]);
    } else {
      return COMPLETE_ENCODER;
    }
  };
  return loop;
}

function while_encoder<GOut>(
  condition: () => boolean,
  statement: IEncoderStatement<GOut>,
): IEncoder<GOut> {
  return while_encoder_statement<GOut>(
    condition,
    statement,
  )();
}

/* DO WHILE */

function do_while_encoder_statement<GOut>(
  statement: IEncoderStatement<GOut>,
  condition: () => boolean,
): IEncoderStatement<GOut> {
  const loop = (): IEncoder<GOut> => {
    return chain_encoder_statements_as_encoder<GOut>([
      statement,
      (): IEncoder<GOut> => {
        return condition()
          ? loop()
          : COMPLETE_ENCODER;
      },
    ]);
  };
  return loop;
}

function do_while_encoder<GOut>(
  statement: IEncoderStatement<GOut>,
  condition: () => boolean,
): IEncoder<GOut> {
  return do_while_encoder_statement(
    statement,
    condition,
  )();
}

/* FOR */

function for_loop_encoder_statement<GOut>(
  condition: () => boolean,
  finalExpression: () => void,
  statement: IEncoderStatement<GOut>,
): IEncoderStatement<GOut> {
  return while_encoder_statement<GOut>(
    condition,
    chain_encoder_statements_as_statement<GOut>([
      statement,
      (): IEncoder<GOut> => {
        finalExpression();
        return COMPLETE_ENCODER;
      },
    ]),
  );
}

function for_loop_encoder<GOut>(
  condition: () => boolean,
  finalExpression: () => void,
  statement: IEncoderStatement<GOut>,
): IEncoder<GOut> {
  return for_loop_encoder_statement<GOut>(
    condition,
    finalExpression,
    statement,
  )();
}

/*---*/

interface IDecoderStatement<GIn, GOut> {
  (): IDecoder<GIn, GOut>;
}

function array_decoder<GIn, GOut>(
  values: ArrayLike<GOut>,
): IEncoder<GOut> {
  let i: number = 0;

  let next: IEncoder<GOut> = (): IEncoderReturn<GOut> => {
    if (i < values.length) {
      return values[i++];
    } else {
      next = COMPLETE_ENCODER;
      return next();
    }
  };

  return (): IEncoderReturn<GOut> => next();
}

/*---*/

function debugEncoders(): void {
  // const encoder = jbson_encode_size(130);
  // const data = encodeToUint8Array(encoder);
  // console.log(data);
  // e_while();

  const debugContextProxy = () => {
    const ctx1 = { a: 'a', c: 'c-a' };
    const ctx2 = { b: 'b', c: 'c-b' };

    const ctx = context_proxy([ctx1, ctx2]);
    console.log(ctx['a']);
    console.log(ctx['c']);
    ctx['a'] = 'a1';
    ctx['c'] = 'c1';
    console.log(ctx1, ctx2);
  };

  const debug_e_while = () => {
    let i: number = 0;
    const it: IEncoder<number> = while_encoder(
      () => (i < 10),
      chain_encoder_statements_as_statement([
        () => value_encoder(i),
        () => {
          i++;
          return COMPLETE_ENCODER;
        },
      ]),
    );

    console.log(encode_to_array(it));
  };

  // const debug_d_while = () => {
  //   let i: number = 0;
  //   const it = d_while(
  //     () => (i < 10),
  //     chain_statements(
  //       () => e_value(i),
  //       () => {
  //         i++;
  //         return COMPLETE_ENCODER;
  //       },
  //     )
  //   );
  //
  //   console.log(decode_from_array(it));
  // };

  const debug_e_for = () => {
    let i: number = 0;
    const it: IEncoder<number> = for_loop_encoder(
      () => (i < 10),
      () => (i++),
      () => value_encoder(i),
    );

    console.log(encode_to_array(it));
  };

  // debugContextProxy();
  // debug_e_while();
  debug_e_for();

}

/*---*/

/*----------------*/

function debugJBSON(): void {
  // const encoder = jbson_encode_size(130);
  // const data = encodeToUint8Array(encoder);
  // console.log(data);
  console.log(encode_to_array(jbson_size_encoder_statement(130)()));
  // console.log(encode_to_array(jbson_encode_uint8_array(new Uint8Array([1, 2, 3]))));
  // codec(130, jbson_encode_size, jbson_decode_size);
  // codec(new Uint8Array([1, 2, 3]), jbson_encode_uint8_array, jbson_decode_uint8_array);

}

/*----------------*/

export function debugSuperCodec(): void {
  // debugSuperCodec1();
  // debugEncoders();
  debugJBSON();
}

