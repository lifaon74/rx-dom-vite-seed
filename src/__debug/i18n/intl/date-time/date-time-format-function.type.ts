export interface IDateTimeFormatFunction {
  (
    value: Date | number,
    options?: Intl.DateTimeFormatOptions,
  ): string;
}
