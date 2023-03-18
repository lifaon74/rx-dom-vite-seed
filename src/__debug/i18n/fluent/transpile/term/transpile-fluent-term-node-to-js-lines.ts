import { Term } from '@fluent/syntax';
import { ILines } from '@lirx/dom';
import { transpileFluentMessageOrTermNodeToJSLines } from '../shared/transpile-fluent-message-or-term-node-to-js-lines';

export interface ITranspileFluentTermNodeToJSLinesOptions {
  termNode: Term;
}

export function transpileFluentTermNodeToJSLines(
  {
    termNode,
    ...options
  }: ITranspileFluentTermNodeToJSLinesOptions,
): ILines {
  return transpileFluentMessageOrTermNodeToJSLines({
    ...options,
    node: termNode,
  });
}
