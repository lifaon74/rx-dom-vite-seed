export interface IListFormatFunction {
  (
    value: Iterable<string>,
    options?: Intl.ListFormatOptions,
  ): string;
}
