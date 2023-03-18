import { MessageReference } from '@fluent/syntax';
import { ILines } from '@lirx/dom';
import {
  transpileFluentMessageOrTermReferenceNodesToJSLines,
} from '../shared/transpile-fluent-message-or-term-reference-nodes-to-js-lines';

export interface ITranspileFluentMessageReferenceNodeToJSLinesOptions {
  messageReferenceNode: MessageReference;
}

export function transpileFluentMessageReferenceNodeToJSLines(
  {
    messageReferenceNode,
    ...options
  }: ITranspileFluentMessageReferenceNodeToJSLinesOptions,
): ILines {
  return transpileFluentMessageOrTermReferenceNodesToJSLines({
    ...options,
    node: messageReferenceNode,
  });
}
