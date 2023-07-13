export interface INumberFormatFunction {
  (
    value: number,
    options?: Partial<Intl.NumberFormatOptions>,
  ): string;
}
