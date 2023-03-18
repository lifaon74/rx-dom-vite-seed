import { Comments } from '@fluent/syntax';
import { ILines } from '@lirx/dom';
import { isCommentNode, isGroupCommentNode, isResourceCommentNode } from '../../nodes/is-fluent-node';
import { transpileFluentCommentNodeToJSLines } from '../comment/transpile-fluent-comment-node-to-js-lines';

export interface ITranspileFluentCommentsNodeToJSLinesOptions {
  commentsNode: Comments;
}

export function transpileFluentCommentsNodeToJSLines(
  {
    commentsNode,
    ...options
  }: ITranspileFluentCommentsNodeToJSLinesOptions,
): ILines {
  if (isCommentNode(commentsNode)) {
    return transpileFluentCommentNodeToJSLines({
      ...options,
      commentNode: commentsNode,
    });
  } else if (isGroupCommentNode(commentsNode)) {
    throw 'TODO'; // TODO
  } else if (isResourceCommentNode(commentsNode)) {
    throw 'TODO'; // TODO
  } else {
    throw new Error(`Unknown Node: ${(commentsNode as any).type}`);
  }
}
