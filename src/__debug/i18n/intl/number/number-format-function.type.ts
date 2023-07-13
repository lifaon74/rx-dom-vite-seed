export interface INumberFormatFunction {
  (
    value: number,
    options?: Intl.NumberFormatOptions,
  ): string;
}
