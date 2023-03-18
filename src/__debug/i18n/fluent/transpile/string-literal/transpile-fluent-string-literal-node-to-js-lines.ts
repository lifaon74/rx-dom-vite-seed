import { StringLiteral } from '@fluent/syntax';
import { ILines } from '@lirx/dom';

export interface ITranspileFluentStringLiteralNodeToJSLinesOptions {
  stringLiteralNode: StringLiteral;
}

export function transpileFluentStringLiteralNodeToJSLines(
  {
    stringLiteralNode,
    ...options
  }: ITranspileFluentStringLiteralNodeToJSLinesOptions,
): ILines {
  return [
    JSON.stringify(stringLiteralNode.value),
  ];
}
