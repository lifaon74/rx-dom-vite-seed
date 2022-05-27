import { ILines } from '../../../../../../misc/lines/lines.type';

export interface IGenerateJSLinesForRXSwitchCaseOptions {
  switchMapName: string;
  caseValue: string;
  template: string;
}

export function generateJSLinesForRXSwitchCase(
  {
    switchMapName,
    caseValue,
    template,
  }: IGenerateJSLinesForRXSwitchCaseOptions,
): ILines {
  return [
    `// switch case`,
    `${switchMapName}.set(${caseValue}, ${template});`,
  ];
}
