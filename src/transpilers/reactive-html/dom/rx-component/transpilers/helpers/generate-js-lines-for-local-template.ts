import { indentLines } from '../../../../../misc/lines/functions/indent-lines';
import { ILines } from '../../../../../misc/lines/lines.type';

export interface IGenerateJSLinesForLocalTemplateOptions {
  bodyLines: ILines;
  templateName: string;
}

export function generateJSLinesForLocalTemplate(
  {
    bodyLines,
    templateName,
  }: IGenerateJSLinesForLocalTemplateOptions,
): ILines {
  return [
    `const ${templateName} = (`,
    ...indentLines(bodyLines),
    `);`,
  ];
}
