import { TermReference } from '@fluent/syntax';
import { ILines } from '@lirx/dom';
import {
  transpileFluentMessageOrTermReferenceNodesToJSLines,
} from '../shared/transpile-fluent-message-or-term-reference-nodes-to-js-lines';

export interface ITranspileFluentTermReferenceNodeToJSLinesOptions {
  termReferenceNode: TermReference;
}

export function transpileFluentTermReferenceNodeToJSLines(
  {
    termReferenceNode,
    ...options
  }: ITranspileFluentTermReferenceNodeToJSLinesOptions,
): ILines {
  return transpileFluentMessageOrTermReferenceNodesToJSLines({
    ...options,
    node: termReferenceNode,
  });
}
