import { IObjectType, IObjectTypeProperty } from '../types/object/object-type.type';
import { IInferInputSet } from './infer-input-set.type';
import { inferUnknownType } from './infer-unknown-type';

export function inferObjectType(
  input: object,
  inputSet: IInferInputSet,
): IObjectType {
  return {
    type: 'object',
    properties: Object.entries(input)
      .map(([key, value]: [string, any]): IObjectTypeProperty => {
        return [
          key,
          inferUnknownType(value, inputSet),
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
