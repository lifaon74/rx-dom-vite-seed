import { IArrayType } from '../types/array/array-type.type';
import { IPointerType } from '../types/pointer/pointer-type.type';
import { mergeTypesList } from '../types/unknown/merge-types-list';
import { IUnknownType } from '../types/unknown/unknown-type.type';
import { IInferInputSet } from './infer-input-set.type';
import { inferPointerType } from './infer-pointer-type';
import { inferUnknownType } from './infer-unknown-type';

export function inferArrayType(
  input: readonly unknown[],
  inputSet: IInferInputSet,
): IArrayType {
  return {
    type: 'array',
    itemsType: mergeTypesList(
      input.map((item: unknown): IUnknownType => {
        return inferUnknownType(item, inputSet);
      }),
    ),
  };
}
