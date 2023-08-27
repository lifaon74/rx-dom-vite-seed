import { IListFormatFunction } from '../../../../../intl/list/types/list-format-function.type';
import {
  IFluentListFormatFunction,
  IFluentListFormatFunctionArguments, IFluentListFormatFunctionList,
  IFluentListFormatFunctionListItem,
} from './fluent-list-format-function.type';

/**
 * @deprecated
 * TODO
 */
export function convertListFormatFunctionToFluentListFormat(
  listFormat: IListFormatFunction,
): IFluentListFormatFunction {
  return (
    ...args: IFluentListFormatFunctionArguments
  ): string => {
    const {
      value,
      options,
    } = normalizeFluentListFormatFunctionArguments(args);

    return listFormat(
      value,
      options,
    );
  };
}

/*---*/

interface INormalizedFluentListFormatFunctionArguments {
  value: Iterable<string>;
  options: Intl.ListFormatOptions | undefined;
}

function normalizeFluentListFormatFunctionArguments(
  args: IFluentListFormatFunctionArguments,
): INormalizedFluentListFormatFunctionArguments {
  let value: Iterable<string>;
  let options: Intl.ListFormatOptions | undefined;

  if (typeof args[args.length - 1] === 'string') {
    value = convertFluentListFormatFunctionListToArrayOfString(args as readonly IFluentListFormatFunctionListItem[]);
    options = void 0;
  } else {
    value = convertFluentListFormatFunctionListToArrayOfString(args.slice(0, -1) as readonly IFluentListFormatFunctionListItem[]);
    options = args[args.length - 1] as Intl.ListFormatOptions;
  }

  return {
    value,
    options,
  };
}

function convertFluentListFormatFunctionListToArrayOfString(
  list: IFluentListFormatFunctionList,
): Iterable<string> {
  const _values: string[] = [];
  for (let i = 0, l = list.length; i < l; i++) {
    const value: IFluentListFormatFunctionListItem = list[i];
    if (typeof value === 'string') {
      _values.push(value);
    } else {
      _values.push(...value);
    }
  }
  return _values;
}
