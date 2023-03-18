import { Pattern, PatternElement } from '@fluent/syntax';
import { ILines, indentLines, inlineLastLines } from '@lirx/dom';
import { CONCAT_NAME } from '../shared/concat-name.constants';
import { transpileFluentPatternElementNodeToJSLines } from './transpile-fluent-pattern-element-node-to-js-lines';

export interface ITranspileFluentPatternNodeToJSLinesOptions {
  patternNode: Pattern;
}

export function transpileFluentPatternNodeToJSLines(
  {
    patternNode,
    ...options
  }: ITranspileFluentPatternNodeToJSLinesOptions,
): ILines {
  return [
    `${CONCAT_NAME}([`,
    ...indentLines(
      patternNode.elements.flatMap((patternElementNode: PatternElement, index: number): ILines => {
        return inlineLastLines(
          transpileFluentPatternElementNodeToJSLines({
            patternElementNode,
            ...options,
          }),
          [','],
        );
      }),
    ),
    `])`,
  ];
}
