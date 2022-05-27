import { inlineLastLines } from '../../../../misc/lines/functions/after-last-line';
import { wrapLinesWithRoundBrackets } from '../../../../misc/lines/functions/wrap-lines-with-round-brackets';
import { ILines } from '../../../../misc/lines/lines.type';
import {
  ITranspileCreateReactiveTextNodeToJSLinesFunction,
  ITranspileCreateReactiveTextNodeToJSLinesOptions,
} from '../../transpilers/transpile-create-reactive-text-node-to-js-lines.type';

export const transpileCreateReactiveTextNodeToJSLines: ITranspileCreateReactiveTextNodeToJSLinesFunction = (
  {
    value,
  }: ITranspileCreateReactiveTextNodeToJSLinesOptions,
): ILines => {
  return inlineLastLines(
    [`new VirtualReactiveTextNode`],
    wrapLinesWithRoundBrackets(value),
  );
};


