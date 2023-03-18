import { TextElement } from '@fluent/syntax';
import { ILines } from '@lirx/dom';

export interface ITranspileFluentTextElementNodeToJSLinesOptions {
  textElementNode: TextElement;
}

export function transpileFluentTextElementNodeToJSLines(
  {
    textElementNode,
    ...options
  }: ITranspileFluentTextElementNodeToJSLinesOptions,
): ILines {
  return [
    JSON.stringify(textElementNode.value),
  ];
}
