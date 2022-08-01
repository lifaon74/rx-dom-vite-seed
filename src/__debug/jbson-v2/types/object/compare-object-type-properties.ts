import { compareUnknownTypes } from '../unknown/compare-unknown-types';
import { IObjectTypeProperty } from './object-type.type';

export function compareObjectTypeProperties(
  propertiesA: readonly IObjectTypeProperty[],
  propertiesB: readonly IObjectTypeProperty[],
): boolean {
  return (propertiesA.length === propertiesB.length)
    && propertiesA.every(([keyA, valueA]: IObjectTypeProperty, index: number): boolean => {
      const [keyB, valueB] = propertiesB[index];
      return (keyA === keyB)
        && compareUnknownTypes(valueA, valueB);
    });
}
