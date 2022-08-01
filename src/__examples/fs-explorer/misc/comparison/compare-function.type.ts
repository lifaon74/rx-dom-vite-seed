export interface ICompareFunction<GValue> {
  (
    a: GValue,
    b: GValue,
  ): number;
}
