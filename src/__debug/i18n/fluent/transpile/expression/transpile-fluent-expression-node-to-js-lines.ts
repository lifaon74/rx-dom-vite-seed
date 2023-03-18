import { Expression } from '@fluent/syntax';
import { ILines } from '@lirx/dom';
import { isInlineExpressionNode, isSelectExpressionNode } from '../../nodes/is-fluent-node';
import { transpileFluentInlineExpressionNodeToJSLines } from '../inline-expression/transpile-fluent-inline-expression-node-to-js-lines';
import { transpileFluentSelectExpressionNodeToJSLines } from '../select-expression/transpile-fluent-select-expression-node-to-js-lines';

export interface ITranspileFluentExpressionNodeToJSLinesOptions {
  expressionNode: Expression;
}

export function transpileFluentExpressionNodeToJSLines(
  {
    expressionNode,
    ...options
  }: ITranspileFluentExpressionNodeToJSLinesOptions,
): ILines {
  if (isInlineExpressionNode(expressionNode)) {
    return transpileFluentInlineExpressionNodeToJSLines({
      ...options,
      inlineExpressionNode: expressionNode,
    });
  } else if (isSelectExpressionNode(expressionNode)) {
    return transpileFluentSelectExpressionNodeToJSLines({
      ...options,
      selectExpressionNode: expressionNode,
    });
  } else {
    throw new Error(`Unknown Node: ${(expressionNode as any).type}`);
  }
}
