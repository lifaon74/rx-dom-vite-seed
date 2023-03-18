export interface IFluentDateTimeFormatFunction {
  (
    value: Date | number,
    options?: Intl.DateTimeFormatOptions,
  ): string;
}
