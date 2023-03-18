import { ILines, indentLines, inlineLastLines, wrapLinesWithCurlyBrackets } from '@lirx/dom';
import { CALL_FUNCTION_NAME } from './call-function-name.constants';
import { CONCAT_NAME } from './concat-name.constants';
import { GET_VARIABLE_NAME } from './get-variable-name.constants';
import { SELECT_NAME } from './select-name.constants';

export interface ITranspileFluentRenderFunctionToJSLinesOptions {
  renderFunctionName: string;
  key: string;
  extraArguments?: ILines;
}

export function transpileFluentRenderFunctionToJSLines(
  {
    renderFunctionName,
    key,
    extraArguments = [],
    ...options
  }: ITranspileFluentRenderFunctionToJSLinesOptions,
): ILines {
  return [
    `${renderFunctionName}(`,
    ...indentLines([
      `${JSON.stringify(key)},`,
      ...inlineLastLines(
        wrapLinesWithCurlyBrackets([
          `${CONCAT_NAME},`,
          `${SELECT_NAME},`,
          `${GET_VARIABLE_NAME},`,
          `${CALL_FUNCTION_NAME},`,
        ]),
        [','],
      ),
      ...extraArguments,
    ]),
    `)`,
  ];
}
