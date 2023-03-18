import { NumberLiteral } from '@fluent/syntax';
import { ILines } from '@lirx/dom';

export interface ITranspileFluentNumberLiteralNodeToJSLinesOptions {
  numberLiteralNode: NumberLiteral;
}

export function transpileFluentNumberLiteralNodeToJSLines(
  {
    numberLiteralNode,
    ...options
  }: ITranspileFluentNumberLiteralNodeToJSLinesOptions,
): ILines {
  return [
    numberLiteralNode.value,
  ];
}
