import { inlineLastLines } from '../../../../misc/lines/functions/after-last-line';
import { indentLines } from '../../../../misc/lines/functions/indent-lines';
import { ILines } from '../../../../misc/lines/lines.type';
import {
  ITranspileCreateReactiveSwitchNodeToJSLinesFunction,
  ITranspileCreateReactiveSwitchNodeToJSLinesOptions,
} from '../../transpilers/transpile-create-reactive-switch-node-to-js-lines.type';

export const transpileCreateReactiveSwitchNodeToJSLines: ITranspileCreateReactiveSwitchNodeToJSLinesFunction = (
  {
    expression,
    templates,
    defaultTemplate,
  }: ITranspileCreateReactiveSwitchNodeToJSLinesOptions,
): ILines => {
  return [
    `new VirtualReactiveSwitchNode(`,
    ...indentLines([
      ...inlineLastLines(
        expression,
        [','],
      ),
      ...inlineLastLines(
        templates,
        [','],
      ),
      ...(
        (defaultTemplate === null)
          ? []
          : inlineLastLines(
            defaultTemplate,
            [','],
          )
      ),
    ]),
    `)`,
  ];
};


