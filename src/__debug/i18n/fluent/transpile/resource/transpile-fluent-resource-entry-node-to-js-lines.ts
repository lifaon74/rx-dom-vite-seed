import { Entry } from '@fluent/syntax';
import { ILines } from '@lirx/dom';
import { isCommentsNode, isJunkNode, isMessageNode, isTermNode } from '../../nodes/is-fluent-node';
import { transpileFluentCommentsNodeToJSLines } from '../comments/transpile-fluent-comments-node-to-js-lines';
import { transpileFluentMessageNodeToJSLines } from '../message/transpile-fluent-message-node-to-js-lines';
import { transpileFluentTermNodeToJSLines } from '../term/transpile-fluent-term-node-to-js-lines';

export interface ITranspileFluentResourceEntryNodeToJSLinesOptions {
  entryNode: Entry;
}

export function transpileFluentResourceEntryNodeToJSLines(
  {
    entryNode,
    ...options
  }: ITranspileFluentResourceEntryNodeToJSLinesOptions,
): ILines {
  if (isMessageNode(entryNode)) {
    return transpileFluentMessageNodeToJSLines({
      ...options,
      messageNode: entryNode,
    });
  } else if (isTermNode(entryNode)) {
    return transpileFluentTermNodeToJSLines({
      ...options,
      termNode: entryNode,
    });
  } else if (isCommentsNode(entryNode)) {
    return transpileFluentCommentsNodeToJSLines({
      ...options,
      commentsNode: entryNode,
    });
  } else if (isJunkNode(entryNode)) {
    throw new Error(`Invalid FTL: ${entryNode.content}`);
  } else {
    throw new Error(`Unknown Node: ${(entryNode as any).type}`);
  }
}
