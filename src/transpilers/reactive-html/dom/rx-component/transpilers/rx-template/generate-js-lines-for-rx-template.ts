import { indentLines } from '../../../../../misc/lines/functions/indent-lines';
import { linesOrNullToLines } from '../../../../../misc/lines/functions/lines-or-null-to-lines';
import { ILinesOrNull } from '../../../../../misc/lines/lines-or-null.type';
import { ILines } from '../../../../../misc/lines/lines.type';

export interface IGenerateJSLinesForRXTemplateOptions {
  argumentsLines: ILinesOrNull;
  bodyLines: ILinesOrNull;
}

export function generateJSLinesForRXTemplate(
  {
    argumentsLines,
    bodyLines,
  }: IGenerateJSLinesForRXTemplateOptions,
): ILines {
  return [
    `(`,
    ...indentLines([
      `parentNode,`,
      ...linesOrNullToLines(argumentsLines),
    ]),
    `) => {`,
    ...indentLines(linesOrNullToLines(bodyLines)),
    `}`,
  ];
}
