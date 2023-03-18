import { IFluentDateTimeFormatFunction } from '../call-function/built-in/date-time/fluent-date-time-format-function.type';
import { IFluentNumberFormatFunction } from '../call-function/built-in/number/fluent-number-format-function.type';

export type IFluentConcatPart =
  | string
  | number
  | Date
  | unknown
  ;

export interface IFluentConcatFunction {
  (
    parts: readonly IFluentConcatPart[],
  ): string;
}

export interface ICreateFluentConcatFunctionOptions {
  fluentNumberFormat: IFluentNumberFormatFunction;
  fluentDateTimeFormat: IFluentDateTimeFormatFunction;
}

export function createFluentConcatFunction(
  {
    fluentNumberFormat,
    fluentDateTimeFormat,
  }: ICreateFluentConcatFunctionOptions,
): IFluentConcatFunction {
  return (
    parts: readonly IFluentConcatPart[],
  ): string => {
    let str: string = '';

    for (let i = 0, l = parts.length; i < l; i++) {
      const part: IFluentConcatPart = parts[i];

      if (typeof part === 'string') {
        str += part;
      } else if (typeof part === 'number') {
        str += fluentNumberFormat(part);
      } else if (part instanceof Date) {
        str += fluentDateTimeFormat(part);
      } else {
        str += String(part);
      }
    }
    return str;
  };
}
