import { ILinesOrNull } from '../../../../../misc/lines/lines-or-null.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';
import { transpileReactiveHTMLStaticTextToJSLines } from './transpile-reactive-html-static-text-to-js-lines';

export interface ITranspileReactiveHTMLStaticTextNodeToJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Text;
}

export function transpileReactiveHTMLStaticTextNodeToJSLines(
  {
    node,
    ...options
  }: ITranspileReactiveHTMLStaticTextNodeToJSLinesOptions,
): ILinesOrNull {
  return transpileReactiveHTMLStaticTextToJSLines({
    ...options,
    value: node.data,
  });
}
