import { ILinesOrNull } from '../../../../../misc/lines/lines-or-null.type';
import { ILines } from '../../../../../misc/lines/lines.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';
import { transpileReactiveHTMLElementToJSLines } from '../../../element/transpile-reactive-html-element-to-js-lines';
import { generateJSLinesForRXTemplate } from '../rx-template/generate-js-lines-for-rx-template';
import { generateJSLinesForLocalTemplate } from './generate-js-lines-for-local-template';

export interface IGenerateJSLinesForLocalTemplateFromElementOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
  templateName: string;
  argumentsLines: ILinesOrNull;
}

export function generateJSLinesForLocalTemplateFromElement(
  {
    node,
    templateName,
    argumentsLines,
    ...options
  }: IGenerateJSLinesForLocalTemplateFromElementOptions,
): ILines {
  return generateJSLinesForLocalTemplate({
    bodyLines: generateJSLinesForRXTemplate({
      argumentsLines,
      bodyLines: transpileReactiveHTMLElementToJSLines({
        ...options,
        node,
      }),
    }),
    templateName,
  });
}
