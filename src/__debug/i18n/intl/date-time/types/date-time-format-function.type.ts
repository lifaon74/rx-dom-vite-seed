export interface IDateTimeFormatFunction {
  (
    value: Date | number,
    options?: Partial<Intl.DateTimeFormatOptions>,
  ): string;
}
