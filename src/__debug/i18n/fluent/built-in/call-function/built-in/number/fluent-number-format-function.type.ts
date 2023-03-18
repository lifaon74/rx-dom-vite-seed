export interface IFluentNumberFormatFunction {
  (
    value: number,
    options?: Intl.NumberFormatOptions,
  ): string;
}
