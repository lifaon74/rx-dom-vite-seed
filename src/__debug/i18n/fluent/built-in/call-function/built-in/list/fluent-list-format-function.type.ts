export type IFluentListFormatFunctionListItem =
  | string
  | Iterable<string>
  ;

export type IFluentListFormatFunctionList = readonly IFluentListFormatFunctionListItem[];

export type IFluentListFormatFunctionArguments = readonly [
  ...list: IFluentListFormatFunctionList,
  options: Intl.ListFormatOptions | IFluentListFormatFunctionListItem,
];

export interface IFluentListFormatFunction {
  (): string;
  (
    ...args: IFluentListFormatFunctionArguments
  ): string;
}
