import { Pattern } from '@fluent/syntax';
import { ILines, indentLines } from '@lirx/dom';
import { transpileFluentPatternNodeToJSLines } from '../pattern/transpile-fluent-pattern-node-to-js-lines';
import { generateJSLinesForFluentFormatFunction } from './generate-js-lines-for-fluent-format-function';

export interface ITranspileFluentRegisterNamedPatternNodeToJSLinesOptions {
  registerFunctionName: string;
  key: string;
  patternNode: Pattern | null;
}

export function transpileFluentRegisterNamedPatternNodeToJSLines(
  {
    registerFunctionName,
    key,
    patternNode,
    ...options
  }: ITranspileFluentRegisterNamedPatternNodeToJSLinesOptions,
): ILines {
  return [
    `${registerFunctionName}(`,
    ...indentLines([
      `${JSON.stringify(key)},`,
      ...generateJSLinesForFluentFormatFunction({
        bodyLines: (patternNode === null)
          ? []
          : [
            `return (`,
            ...indentLines(
              transpileFluentPatternNodeToJSLines({
                patternNode,
              }),
            ),
            `);`,
          ],
      }),
    ]),
    `);`,
  ];
}
