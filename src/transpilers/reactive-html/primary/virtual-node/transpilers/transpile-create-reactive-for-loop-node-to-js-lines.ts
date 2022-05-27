import { inlineLastLines } from '../../../../misc/lines/functions/after-last-line';
import { indentLines } from '../../../../misc/lines/functions/indent-lines';
import { ILines } from '../../../../misc/lines/lines.type';
import {
  ITranspileCreateReactiveForLoopNodeToJSLinesFunction,
  ITranspileCreateReactiveForLoopNodeToJSLinesOptions,
} from '../../transpilers/transpile-create-reactive-for-loop-node-to-js-lines.type';

export const transpileCreateReactiveForLoopNodeToJSLines: ITranspileCreateReactiveForLoopNodeToJSLinesFunction = (
  {
    items,
    template,
    trackBy,
  }: ITranspileCreateReactiveForLoopNodeToJSLinesOptions,
): ILines => {
  return [
    `new VirtualReactiveForLoopNode(`,
    ...indentLines([
      ...inlineLastLines(
        items,
        [','],
      ),
      ...inlineLastLines(
        template,
        [','],
      ),
      ...(
        (trackBy === null)
          ? []
          : inlineLastLines(
            trackBy,
            [','],
          )
      ),
    ]),
    `)`,
  ];
};


