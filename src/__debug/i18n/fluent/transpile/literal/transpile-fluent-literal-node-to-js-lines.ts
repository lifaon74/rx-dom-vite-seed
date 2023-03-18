import { Literal } from '@fluent/syntax';
import { ILines } from '@lirx/dom';
import { isNumberLiteralNode, isStringLiteralNode } from '../../nodes/is-fluent-node';
import { transpileFluentNumberLiteralNodeToJSLines } from '../number-literal/transpile-fluent-number-literal-node-to-js-lines';
import { transpileFluentStringLiteralNodeToJSLines } from '../string-literal/transpile-fluent-string-literal-node-to-js-lines';

export interface ITranspileFluentLiteralNodeToJSLinesOptions {
  literalNode: Literal;
}

export function transpileFluentLiteralNodeToJSLines(
  {
    literalNode,
    ...options
  }: ITranspileFluentLiteralNodeToJSLinesOptions,
): ILines {
  if (isStringLiteralNode(literalNode)) {
    return transpileFluentStringLiteralNodeToJSLines({
      ...options,
      stringLiteralNode: literalNode,
    });
  } else if (isNumberLiteralNode(literalNode)) {
    return transpileFluentNumberLiteralNodeToJSLines({
      ...options,
      numberLiteralNode: literalNode,
    });
  } else {
    throw new Error(`Unknown Node: ${(literalNode as any).type}`);
  }
}
