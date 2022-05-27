import { ILinesOrNull } from '../../../../../misc/lines/lines-or-null.type';
import { ILines } from '../../../../../misc/lines/lines.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';
import { isRXContainer } from '../rx-container/is-rx-container';
import { generateJSLinesForLocalTemplateFromElement } from './generate-js-lines-for-local-template-from-element';
import { generateJSLinesForLocalTemplateFromNodes } from './generate-js-lines-for-local-template-from-nodes';

export interface IGenerateJSLinesForLocalTemplateFromRXContainerElementOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
  templateName: string;
  argumentsLines: ILinesOrNull;
}

export function generateJSLinesForLocalTemplateFromRXContainerElement(
  {
    node,
    ...options
  }: IGenerateJSLinesForLocalTemplateFromRXContainerElementOptions,
): ILines {
  return isRXContainer(node)
    ? generateJSLinesForLocalTemplateFromNodes({
      ...options,
      nodes: node.childNodes,
    })
    : generateJSLinesForLocalTemplateFromElement({
      ...options,
      node,
    });
}
