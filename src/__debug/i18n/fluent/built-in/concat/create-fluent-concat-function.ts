import { IFluentDateTimeFormatFunction } from '../call-function/built-in/date-time/fluent-date-time-format-function.type';
import { IFluentNumberFormatFunction } from '../call-function/built-in/number/fluent-number-format-function.type';
import { IFluentConcatFunction, IFluentConcatFunctionList, IFluentConcatFunctionListItem } from './fluent-concat-function.type';

export interface ICreateFluentConcatFunctionOptions {
  fluentNumberFormat: IFluentNumberFormatFunction;
  fluentDateTimeFormat: IFluentDateTimeFormatFunction;
}

export function createFluentConcatFunction(
  options: ICreateFluentConcatFunctionOptions,
): IFluentConcatFunction {
  return (
    list: IFluentConcatFunctionList,
  ): string => {
    return convertFluentConcatFunctionListToString(list, options);
  };
}

/*---*/

export function convertFluentConcatFunctionListToString(
  list: IFluentConcatFunctionList,
  options: ICreateFluentConcatFunctionOptions,
): string {
  let str: string = '';
  for (let i = 0, l = list.length; i < l; i++) {
    str += convertFluentConcatFunctionListItemToString(list[i], options);
  }
  return str;
}


export function convertFluentConcatFunctionListItemToString(
  item: IFluentConcatFunctionListItem,
  {
    fluentNumberFormat,
    fluentDateTimeFormat,
  }: ICreateFluentConcatFunctionOptions,
): string {
  if (typeof item === 'string') {
    return item;
  } else if (typeof item === 'number') {
    return fluentNumberFormat(item);
  } else if (item instanceof Date) {
    return fluentDateTimeFormat(item);
  } else {
    throw new Error(`Invalid type found for concat`);
  }
}
