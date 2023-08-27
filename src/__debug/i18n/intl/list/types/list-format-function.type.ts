export interface IListFormatFunction {
  (
    list: Iterable<string>,
    options?: Intl.ListFormatOptions,
  ): string;
}
