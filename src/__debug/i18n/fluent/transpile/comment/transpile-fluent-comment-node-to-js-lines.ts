import { Comment } from '@fluent/syntax';
import { ILines } from '@lirx/dom';

export interface ITranspileFluentCommentNodeToJSLinesOptions {
  commentNode: Comment;
}

export function transpileFluentCommentNodeToJSLines(
  {
    commentNode,
    ...options
  }: ITranspileFluentCommentNodeToJSLinesOptions,
): ILines {
  return [
    `// ${commentNode.content}`,
  ];
}
