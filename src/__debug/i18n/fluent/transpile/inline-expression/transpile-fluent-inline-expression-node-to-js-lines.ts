import { InlineExpression } from '@fluent/syntax';
import { ILines } from '@lirx/dom';
import {
  isFunctionReferenceNode,
  isMessageReferenceNode,
  isNumberLiteralNode,
  isPlaceableNode,
  isStringLiteralNode,
  isTermReferenceNode,
  isVariableReferenceNode,
} from '../../nodes/is-fluent-node';
import { transpileFluentFunctionReferenceNodeToJSLines } from '../function-reference/transpile-fluent-function-reference-node-to-js-lines';
import { transpileFluentMessageReferenceNodeToJSLines } from '../message-reference/transpile-fluent-message-reference-node-to-js-lines';
import { transpileFluentNumberLiteralNodeToJSLines } from '../number-literal/transpile-fluent-number-literal-node-to-js-lines';
import { transpileFluentPlaceableNodeToJSLines } from '../placeable/transpile-fluent-placeable-node-to-js-lines';
import { transpileFluentStringLiteralNodeToJSLines } from '../string-literal/transpile-fluent-string-literal-node-to-js-lines';
import { transpileFluentTermReferenceNodeToJSLines } from '../term-reference/transpile-fluent-term-reference-node-to-js-lines';
import { transpileFluentVariableReferenceNodeToJSLines } from '../variable-reference/transpile-fluent-variable-reference-node-to-js-lines';

export interface ITranspileFluentInlineExpressionNodeToJSLinesOptions {
  inlineExpressionNode: InlineExpression;
}

export function transpileFluentInlineExpressionNodeToJSLines(
  {
    inlineExpressionNode,
    ...options
  }: ITranspileFluentInlineExpressionNodeToJSLinesOptions,
): ILines {
  if (isStringLiteralNode(inlineExpressionNode)) {
    return transpileFluentStringLiteralNodeToJSLines({
      ...options,
      stringLiteralNode: inlineExpressionNode,
    });
  } else if (isNumberLiteralNode(inlineExpressionNode)) {
    return transpileFluentNumberLiteralNodeToJSLines({
      ...options,
      numberLiteralNode: inlineExpressionNode,
    });
  } else if (isFunctionReferenceNode(inlineExpressionNode)) {
    return transpileFluentFunctionReferenceNodeToJSLines({
      ...options,
      functionReferenceNode: inlineExpressionNode,
    });
  } else if (isMessageReferenceNode(inlineExpressionNode)) {
    return transpileFluentMessageReferenceNodeToJSLines({
      ...options,
      messageReferenceNode: inlineExpressionNode,
    });
  } else if (isTermReferenceNode(inlineExpressionNode)) {
    return transpileFluentTermReferenceNodeToJSLines({
      ...options,
      termReferenceNode: inlineExpressionNode,
    });
  } else if (isVariableReferenceNode(inlineExpressionNode)) {
    return transpileFluentVariableReferenceNodeToJSLines({
      ...options,
      variableReferenceNode: inlineExpressionNode,
    });
  } else if (isPlaceableNode(inlineExpressionNode)) {
    return transpileFluentPlaceableNodeToJSLines({
      ...options,
      placeableNode: inlineExpressionNode,
    });
  } else {
    throw new Error(`Unknown Node: ${(inlineExpressionNode as any).type}`);
  }
}
