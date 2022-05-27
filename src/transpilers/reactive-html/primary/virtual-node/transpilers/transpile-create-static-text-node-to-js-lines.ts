import { inlineLastLines } from '../../../../misc/lines/functions/after-last-line';
import { wrapLinesWithRoundBrackets } from '../../../../misc/lines/functions/wrap-lines-with-round-brackets';
import { ILines } from '../../../../misc/lines/lines.type';
import {
  ITranspileCreateStaticTextNodeToJSLinesFunction,
  ITranspileCreateStaticTextNodeToJSLinesOptions,
} from '../../transpilers/transpile-create-static-text-node-to-js-lines.type';

export const transpileCreateStaticTextNodeToJSLines: ITranspileCreateStaticTextNodeToJSLinesFunction = (
  {
    value,
  }: ITranspileCreateStaticTextNodeToJSLinesOptions,
): ILines => {
  return inlineLastLines(
    [`new VirtualTextNode`],
    wrapLinesWithRoundBrackets(value),
  );
};


