import { isAlternativeType } from '../../alternative/is-alternative-type';
import { mergeAlternativeTypeWithUnknownType } from '../../alternative/merge-alternative-type-with-unknown-type';
import { createSimpleUnion } from '../../union/create-simple-union';
import { isUnionType } from '../../union/is-union-type';
import { mergeUnionTypeWithUnknownType } from '../../union/merge-union-type-with-unknown-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { F64_TYPE } from '../f64/f64-type.constant';
import { isF64Type } from '../f64/is-f64-type';
import { isI16Type } from '../i16/is-i16-type';
import { isI32Type } from '../i32/is-i32-type';
import { isI8Type } from '../i8/is-i8-type';
import { isU16Type } from '../u16/is-u16-type';
import { isU8Type } from '../u8/is-u8-type';
import { isU32Type } from './is-u32-type';
import { U32_TYPE } from './u32-type.constant';
import { IU32Type } from './u32-type.type';

export function mergeU32TypeWithUnknownType(
  typeA: IU32Type,
  typeB: IUnknownType,
): IUnknownType {
  if (isAlternativeType(typeB)) {
    return mergeAlternativeTypeWithUnknownType(typeB, typeA);
  } else if (isUnionType(typeB)) {
    return mergeUnionTypeWithUnknownType(typeB, typeA);
  } else if (isU8Type(typeB)) {
    return U32_TYPE;
  } else if (isU16Type(typeB)) {
    return U32_TYPE;
  } else if (isU32Type(typeB)) {
    return U32_TYPE;
  } else if (isI8Type(typeB)) {
    return F64_TYPE;
  } else if (isI16Type(typeB)) {
    return F64_TYPE;
  } else if (isI32Type(typeB)) {
    return F64_TYPE;
  } else if (isF64Type(typeB)) {
    return F64_TYPE;
  } else {
    return createSimpleUnion(typeA, typeB);
  }
}
