import { IListFormatFunction } from '../../../../../intl/list/list-format-function.type';
import {
  IFluentListFormatFunction,
  IFluentListFormatFunctionArguments,
  IFluentListFormatFunctionItem,
} from './fluent-list-format-function.type';

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
    value = normalizeFluentListFormatFunctionValues(args as readonly IFluentListFormatFunctionItem[]);
    options = void 0;
  } else {
    value = normalizeFluentListFormatFunctionValues(args.slice(0, -1) as readonly IFluentListFormatFunctionItem[]);
    options = args[args.length - 1] as Intl.ListFormatOptions;
  }

  return {
    value,
    options,
  };
}

function normalizeFluentListFormatFunctionValues(
  values: readonly IFluentListFormatFunctionItem[],
): Iterable<string> {
  const _values: string[] = [];
  for (let i = 0, l = values.length; i < l; i++) {
    const value: IFluentListFormatFunctionItem = values[i];
    if (typeof value === 'string') {
      _values.push(value);
    } else {
      _values.push(...value);
    }
  }
  return _values;
}
