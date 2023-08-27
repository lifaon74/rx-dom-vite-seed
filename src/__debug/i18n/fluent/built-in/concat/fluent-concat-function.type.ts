export type IFluentConcatFunctionListItem =
  | string
  | number
  | Date
  ;

export type IFluentConcatFunctionList = readonly IFluentConcatFunctionListItem[];

export interface IFluentConcatFunction {
  (
    list: IFluentConcatFunctionList,
  ): string;
}
