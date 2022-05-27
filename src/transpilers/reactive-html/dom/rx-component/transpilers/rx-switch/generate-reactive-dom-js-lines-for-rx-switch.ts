import { wrapLinesWithCurlyBrackets } from '../../../../../misc/lines/functions/wrap-lines-with-curly-brackets';
import { ILines } from '../../../../../misc/lines/lines.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';

export interface IGenerateJSLinesForRXSwitchOptions extends IHavingPrimaryTranspilersOptions {
  expression: string;
  childLines: ILines;
  switchMapName: string;
  switchDefaultName: string;
}

export function generateJSLinesForRXSwitch(
  {
    expression,
    childLines,
    switchMapName,
    switchDefaultName,
    transpilers,
  }: IGenerateJSLinesForRXSwitchOptions,
): ILines {
  const {
    transpileAttachNodeToJSLines,
    transpileCreateReactiveSwitchNodeToJSLines,
    transpileToObservableToJSLines,
  } = transpilers;

  return wrapLinesWithCurlyBrackets([
    `// reactive switch node`,
    `const ${switchMapName} = new Map();`,  // INFO let and const are important, because they SCOPE and fix the variables
    `let ${switchDefaultName} = null;`,
    ...childLines,
    ...transpileAttachNodeToJSLines({
      node: transpileCreateReactiveSwitchNodeToJSLines({
        expression: transpileToObservableToJSLines({ value: [expression] }),
        templates: [switchMapName],
        defaultTemplate: [switchDefaultName],
      }),
      parentNode: ['parentNode'],
    }),
  ]);
}
