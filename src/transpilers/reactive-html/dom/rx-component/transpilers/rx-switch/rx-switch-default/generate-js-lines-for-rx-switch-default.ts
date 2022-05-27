import { ILines } from '../../../../../../misc/lines/lines.type';

export interface IGenerateJSLinesForRXSwitchDefaultOptions {
  switchDefaultName: string;
  template: string;
}

export function generateJSLinesForRXSwitchDefault(
  {
    switchDefaultName,
    template,
  }: IGenerateJSLinesForRXSwitchDefaultOptions,
): ILines {
  return [
    `// switch default`,
    `${switchDefaultName} = ${template};`,
  ];
}
