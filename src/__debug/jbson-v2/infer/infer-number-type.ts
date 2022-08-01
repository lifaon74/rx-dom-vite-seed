import { IAlternativeType } from '../types/alternative/alternative-type.type';
import { createRawAlternativeType } from '../types/alternative/create-raw-alternative-type';
import { F64_TYPE } from '../types/number/f64/f64-type.constant';
import { I16_TYPE } from '../types/number/i16/i16-type.constant';
import { I32_TYPE } from '../types/number/i32/i32-type.constant';
import { I8_TYPE } from '../types/number/i8/i8-type.constant';
import { INumberType } from '../types/number/number-type.type';
import { U16_TYPE } from '../types/number/u16/u16-type.constant';
import { U32_TYPE } from '../types/number/u32/u32-type.constant';
import { U8_TYPE } from '../types/number/u8/u8-type.constant';

export function inferNumberType(
  input: number,
): INumberType | IAlternativeType {
  if (Number.isSafeInteger(input)) {
    if (input >= 0) {
      if (input <= 0x7f) {
        return createRawAlternativeType([
          I8_TYPE,
          U8_TYPE,
          I16_TYPE,
          U16_TYPE,
          I32_TYPE,
          U32_TYPE,
          F64_TYPE,
        ]);
      } else if (input <= 0xff) {
        return createRawAlternativeType([
          U8_TYPE,
          I16_TYPE,
          U16_TYPE,
          I32_TYPE,
          U32_TYPE,
          F64_TYPE,
        ]);
      } else if (input <= 0x7fff) {
        return createRawAlternativeType([
          I16_TYPE,
          U16_TYPE,
          I32_TYPE,
          U32_TYPE,
          F64_TYPE,
        ]);
      } else if (input <= 0xffff) {
        return createRawAlternativeType([
          U16_TYPE,
          I32_TYPE,
          U32_TYPE,
          F64_TYPE,
        ]);
      } else if (input <= 0x7fffffff) {
        return createRawAlternativeType([
          I32_TYPE,
          U32_TYPE,
          F64_TYPE,
        ]);
      } else if (input <= 0xffffffff) {
        return createRawAlternativeType([
          U32_TYPE,
          F64_TYPE,
        ]);
      } else {
        return F64_TYPE;
      }
    } else {
      if (input >= -0x7f) {
        return createRawAlternativeType([
          I8_TYPE,
          I16_TYPE,
          I32_TYPE,
          F64_TYPE,
        ]);
      } else if (input >= -0x7fff) {
        return createRawAlternativeType([
          I16_TYPE,
          I32_TYPE,
          F64_TYPE,
        ]);
      } else if (input >= -0x7fffffff) {
        return createRawAlternativeType([
          I32_TYPE,
          F64_TYPE,
        ]);
      } else {
        return F64_TYPE;
      }
    }
  } else {
    return F64_TYPE;
  }
}
