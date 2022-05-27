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
  } else if (decodedValue !== value) {
    throw new Error(`Decoded value is different than encoded value`);
  }
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

export function jbson_encode_size(
  size: number,
): IEncoder<u8> {
  let next: IEncoder<u8>;
  let byte: number;

  const next0 = (): IEncoderReturn<u8> => {
    byte = (size & 0b01111111);
    size >>= 7;
    byte |= ((size !== 0) as any) << 7;
    next = next1;
    return byte;
  };

  const next1 = (): IEncoderReturn<u8> => {
    if (size === 0) {
      next = COMPLETE_ENCODER;
    } else {
      next = next0;
    }
    return next();
  };

  next = next0;

  return (): IEncoderReturn<u8> => next();
}

export function jbson_decode_size(): IDecoder<u8, number> {
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

/*---*/

function chain_encoders<GOut>(
  encoderA: IEncoder<GOut>,
  encoderB: IEncoder<GOut>,
): IEncoder<GOut> {
  let next: IEncoder<GOut> = (): IEncoderReturn<GOut> => {
    const result: IEncoderReturn<GOut> = encoderA();
    if (result === COMPLETE) {
      next = encoderB;
      return next();
    } else {
      return result;
    }
  };
  return (): IEncoderReturn<GOut> => next();
}

function e_for<GContext, GLocalContext, GOut>(
  context: GContext,
  initialization: (context: GContext) => GLocalContext,
  condition: (context: GContext & GLocalContext) => boolean,
  finalExpression: (context: GContext & GLocalContext) => void,
  statement: (context: GContext & GLocalContext) => IEncoder<GOut>,
): IEncoder<GOut> {
  let next: IEncoder<GOut>;
  let localContext: GContext & GLocalContext;

  const next0 = (): IEncoderReturn<GOut> => {
    localContext = {
      ...context,
      ...initialization(context),
    };
    next = next1;
    return next();
  };

  const next1 = (): IEncoderReturn<GOut> => {
    if (condition(localContext)) {
      next = chain_encoders(
        statement(localContext),
        next1,
      );
    } else {
      next = COMPLETE_ENCODER;
    }
    return next();
  };

  next = next0;

  return (): IEncoderReturn<GOut> => next();
}

/*---*/

export function jbson_encode_uint8_array(
  array: Uint8Array,
): IEncoder<u8> {
  let next: IEncoder<u8>;
  let sizeEncoder: IEncoder<u8>;

  const next0 = (): IEncoderReturn<u8> => {
    sizeEncoder = jbson_encode_size(array.length);
    next = next1;
    return next();
  };

  const next1 = (): IEncoderReturn<u8> => {
    const result: IEncoderReturn<u8> = sizeEncoder();
    if (result === COMPLETE) {
      next = next2;
      return next();
    } else {
      return result;
    }
  };

  let i: number;
  let l: number;

  const next2 = (): IEncoderReturn<u8> => {
    i = 0;
    l = array.length;
    next = next3;
    return next();
  };

  const next3 = (): IEncoderReturn<u8> => {
    if (i < l) {
      return array[i++];
    } else {
      next = COMPLETE_ENCODER;
      return next();
    }
  };

  next = next0;

  return (): IEncoderReturn<u8> => next();
}

/*----------------*/

function debugJBSON(): void {
  // const encoder = jbson_encode_size(130);
  // const data = encodeToUint8Array(encoder);
  // console.log(data);
  codec(130, jbson_encode_size, jbson_decode_size);

}

/*----------------*/

export function debugSuperCodec(): void {
  // debugSuperCodec1();
  debugJBSON();
}

