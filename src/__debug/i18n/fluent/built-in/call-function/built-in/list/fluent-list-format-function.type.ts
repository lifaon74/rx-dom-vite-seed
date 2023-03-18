export type IFluentListFormatFunctionItem =
  | string
  | Iterable<string>
  ;

export type IFluentListFormatFunctionArguments = readonly [
  ...values: readonly IFluentListFormatFunctionItem[],
  options: Intl.ListFormatOptions | IFluentListFormatFunctionItem,
];

export interface IFluentListFormatFunction {
  (
    ...args: IFluentListFormatFunctionArguments
  ): string;
}
