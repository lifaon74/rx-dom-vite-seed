import { IFluentListFormatFunctionListItem } from './fluent-list-format-function.type';

export function convertFluentListFormatFunctionListItemToIterableOfString(
  item: IFluentListFormatFunctionListItem,
): Iterable<string> {
  if (typeof item === 'string') {
    return [item];
  } else if (Symbol.iterator in item) {
    return item;
  } else {
    throw new Error(`Not a IFluentListFormatFunctionItem`);
  }
}
