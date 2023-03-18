import { PatternElement } from '@fluent/syntax';
import { ILines } from '@lirx/dom';
import { isPlaceableNode, isTextElementNode } from '../../nodes/is-fluent-node';
import { transpileFluentPlaceableNodeToJSLines } from '../placeable/transpile-fluent-placeable-node-to-js-lines';
import { transpileFluentTextElementNodeToJSLines } from '../text-element/transpile-fluent-text-element-node-to-js-lines';

export interface ITranspileFluentPatternElementNodeToJSLinesOptions {
  patternElementNode: PatternElement;
}

export function transpileFluentPatternElementNodeToJSLines(
  {
    patternElementNode,
    ...options
  }: ITranspileFluentPatternElementNodeToJSLinesOptions,
): ILines {
  if (isTextElementNode(patternElementNode)) {
    return transpileFluentTextElementNodeToJSLines({
      ...options,
      textElementNode: patternElementNode,
    });
  } else if (isPlaceableNode(patternElementNode)) {
    return transpileFluentPlaceableNodeToJSLines({
      ...options,
      placeableNode: patternElementNode,
    });
  } else {
    throw new Error(`Unknown Node: ${(patternElementNode as any).type}`);
  }
}
