import { parse, Resource } from '@fluent/syntax';
import { linesToString } from '@lirx/dom';
import { IReadonlyFluentMessagesMap } from '../built-in/message/map/fluent-messages-map.type';
import { createFluentResourceFunctionOptions } from '../built-in/resource/create-fluent-resource-function-options';
import { IFluentResourceFunction, IFluentResourceOptions } from '../built-in/resource/fluent-resource-function.type';
import { transpileFluentResourceNodeToJSLines } from '../transpile/resource/transpile-fluent-resource-node-to-js-lines';

export function compileFluentResource(
  input: string,
): IReadonlyFluentMessagesMap {
  const resourceNode: Resource = parse(input, {
    withSpans: false,
  });

  // console.log(resourceNode);

  const code: string = linesToString(
    transpileFluentResourceNodeToJSLines({
      resourceNode,
    }),
  );

  // console.log(code);

  const run: IFluentResourceFunction = new Function('_', `return (${code})(_);`) as IFluentResourceFunction;

  const fluentResourceOptions: IFluentResourceOptions = createFluentResourceFunctionOptions();

  run(fluentResourceOptions);

  return fluentResourceOptions.messages;
}
