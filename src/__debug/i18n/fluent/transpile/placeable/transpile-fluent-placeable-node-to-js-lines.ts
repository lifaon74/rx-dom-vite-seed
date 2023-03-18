import { Placeable } from '@fluent/syntax';
import { ILines } from '@lirx/dom';
import { transpileFluentExpressionNodeToJSLines } from '../expression/transpile-fluent-expression-node-to-js-lines';

export interface ITranspileFluentPlaceableNodeToJSLinesOptions {
  placeableNode: Placeable;
}

export function transpileFluentPlaceableNodeToJSLines(
  {
    placeableNode,
    ...options
  }: ITranspileFluentPlaceableNodeToJSLinesOptions,
): ILines {
  return transpileFluentExpressionNodeToJSLines({
    ...options,
    expressionNode: placeableNode.expression,
  });
}
