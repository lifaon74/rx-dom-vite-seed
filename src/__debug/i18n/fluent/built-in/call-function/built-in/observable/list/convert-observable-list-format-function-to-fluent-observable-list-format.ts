import {
  combineLatest,
  IObservable,
  isMaybeObservable,
  isSignal,
  map$$,
  unknownToObservableNotUndefined,
  unknownToObservableStrict,
} from '@lirx/core';
import { IObservableListFormatFunction } from '../../../../../../intl/list/observable/types/observable-list-format-function.type';
import {
  convertFluentListFormatFunctionListItemToIterableOfString,
} from '../../list/convert-fluent-list-format-function-list-item-to-iterable-of-string';
import {
  IFluentObservableListFormatFunction,
  IFluentObservableListFormatFunctionArguments,
  IFluentObservableListFormatFunctionList,
  IFluentObservableListFormatFunctionListItem,
} from './fluent-observable-list-format-function.type';

export function convertObservableListFormatFunctionToFluentObservableListFormat(
  listFormat: IObservableListFormatFunction,
): IFluentObservableListFormatFunction {
  return (
    ...args: IFluentObservableListFormatFunctionArguments
  ): IObservable<string> => {
    const {
      list,
      options,
    } = extractListAndOptionsFromFluentObservableListFormatFunctionArguments(args);

    return listFormat(
      convertFluentObservableListFormatFunctionItemsToObservableOfArrayOfString(list),
      options,
    );
  };
}

/*---*/

export interface IExtractedListAndOptionsFromFluentObservableListFormatFunctionArguments {
  list: IFluentObservableListFormatFunctionList;
  options: Intl.ListFormatOptions | undefined;
}

export function extractListAndOptionsFromFluentObservableListFormatFunctionArguments(
  args: IFluentObservableListFormatFunctionArguments,
): IExtractedListAndOptionsFromFluentObservableListFormatFunctionArguments {
  const lastArg: Intl.ListFormatOptions | IFluentObservableListFormatFunctionListItem = args[args.length - 1];

  if (
    (typeof lastArg === 'string')
    || (Symbol.iterator in lastArg)
  ) {
    return {
      list: args as IFluentObservableListFormatFunctionList,
      options: void 0,
    };
  } else {
    try {
      return {
        list: unknownToObservableStrict(args) as IFluentObservableListFormatFunctionList,
        options: void 0,
      };
    } catch {
      return {
        list: args.slice(0, -1) as IFluentObservableListFormatFunctionList,
        options: lastArg as Intl.ListFormatOptions,
      };
    }
  }
}

export function convertFluentObservableListFormatFunctionItemsToObservableOfArrayOfString(
  list: IFluentObservableListFormatFunctionList,
): IObservable<readonly string[]> {
  return map$$(
    combineLatest(
      list.map(convertFluentObservableListFormatFunctionListItemToObservableOfIterableOfString),
    ),
    (parts: readonly Iterable<string>[]): readonly string[] => {
      return parts.reduce((array: readonly string[], iterable: Iterable<string>): readonly string[] => {
        return [
          ...array,
          ...iterable,
        ];
      }, []);
    },
  );
}

export function convertFluentObservableListFormatFunctionListItemToObservableOfIterableOfString(
  item: IFluentObservableListFormatFunctionListItem,
): IObservable<Iterable<string>> {
  return map$$(unknownToObservableNotUndefined(item), convertFluentListFormatFunctionListItemToIterableOfString);
}

