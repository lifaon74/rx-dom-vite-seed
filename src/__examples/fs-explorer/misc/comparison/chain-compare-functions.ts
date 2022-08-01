import { ICompareFunction } from './compare-function.type';

export function chainCompareFunctions<GValue>(
  compareFunctions: readonly ICompareFunction<GValue>[],
): ICompareFunction<GValue> {
  const length: number = compareFunctions.length;
  return (
    a: GValue,
    b: GValue,
  ): number => {
    let result: number = 0;
    let i: number = 0;

    while (
      (result === 0)
      && (i < length)
      ) {
      result = compareFunctions[i](a, b);
      i++;
    }

    return result;
  };
}
