import { parse, Resource } from '@fluent/syntax';
import { linesToString } from '@lirx/dom';
import { IReadonlyFluentMessagesMap } from '../built-in/message/map/fluent-messages-map.type';
import {
  IFluentObservableMessagesMap,
  IReadonlyFluentObservableMessagesMap,
} from '../built-in/message/map/fluent-observable-messages-map.type';
import { createFluentObservableResourceFunctionOptions } from '../built-in/resource/create-fluent-observable-resource-function-options';
import { createFluentResourceFunctionOptions } from '../built-in/resource/create-fluent-resource-function-options';
import {
  IFluentObservableResourceFunction,
  IFluentObservableResourceOptions,
} from '../built-in/resource/fluent-observable-resource-function.type';
import { IFluentResourceFunction, IFluentResourceOptions } from '../built-in/resource/fluent-resource-function.type';
import { transpileFluentResourceNodeToJSLines } from '../transpile/resource/transpile-fluent-resource-node-to-js-lines';

export function compileFluentObservableResource(
  input: string,
): IReadonlyFluentObservableMessagesMap {
  const resourceNode: Resource = parse(input, {
    withSpans: false,
  });

  const code: string = linesToString(
    transpileFluentResourceNodeToJSLines({
      resourceNode,
    }),
  );

  // console.log(code);

  const run: IFluentObservableResourceFunction = new Function('_', `return (${code})(_);`) as IFluentObservableResourceFunction;

  const fluentResourceOptions: IFluentObservableResourceOptions = createFluentObservableResourceFunctionOptions();

  run(fluentResourceOptions);

  return fluentResourceOptions.messages;
}