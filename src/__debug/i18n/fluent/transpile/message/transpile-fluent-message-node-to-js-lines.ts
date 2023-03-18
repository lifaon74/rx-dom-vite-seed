import { Message } from '@fluent/syntax';
import { ILines } from '@lirx/dom';
import { transpileFluentMessageOrTermNodeToJSLines } from '../shared/transpile-fluent-message-or-term-node-to-js-lines';

export interface ITranspileFluentMessageNodeToJSLinesOptions {
  messageNode: Message;
}

export function transpileFluentMessageNodeToJSLines(
  {
    messageNode,
    ...options
  }: ITranspileFluentMessageNodeToJSLinesOptions,
): ILines {
  return transpileFluentMessageOrTermNodeToJSLines({
    ...options,
    node: messageNode,
  });
}
