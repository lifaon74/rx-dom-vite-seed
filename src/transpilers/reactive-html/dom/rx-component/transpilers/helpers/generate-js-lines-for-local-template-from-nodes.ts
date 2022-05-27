import { ILinesOrNull } from '../../../../../misc/lines/lines-or-null.type';
import { ILines } from '../../../../../misc/lines/lines.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';
import { transpileReactiveHTMLNodesToJSLines } from '../../../nodes/transpile-reactive-html-nodes-to-js-lines';
import { generateJSLinesForRXTemplate } from '../rx-template/generate-js-lines-for-rx-template';
import { generateJSLinesForLocalTemplate } from './generate-js-lines-for-local-template';

export interface IGenerateJSLinesForLocalTemplateFromNodesOptions extends IHavingPrimaryTranspilersOptions {
  nodes: ArrayLike<Node>;
  templateName: string,
  argumentsLines: ILinesOrNull,
}

export function generateJSLinesForLocalTemplateFromNodes(
  {
    nodes,
    // templateName = 'template',
    templateName,
    argumentsLines,
    ...options
  }: IGenerateJSLinesForLocalTemplateFromNodesOptions,
): ILines {
  return generateJSLinesForLocalTemplate({
    bodyLines: generateJSLinesForRXTemplate({
      argumentsLines,
      bodyLines: transpileReactiveHTMLNodesToJSLines({
        ...options,
        nodes,
      }),
    }),
    templateName,
  });
}
