import { ILines, indentLines } from '@lirx/dom';
import { CALL_FUNCTION_NAME } from './call-function-name.constants';
import { CONCAT_NAME } from './concat-name.constants';
import { GET_VARIABLE_NAME } from './get-variable-name.constants';
import { SELECT_NAME } from './select-name.constants';

export interface IGenerateJSLinesForFluentFormatFunctionOptions {
  bodyLines: ILines;
}

export function generateJSLinesForFluentFormatFunction(
  {
    bodyLines,
  }: IGenerateJSLinesForFluentFormatFunctionOptions,
): ILines {
  return [
    `({`,
    ...indentLines([
      `${CONCAT_NAME},`,
      `${SELECT_NAME},`,
      `${GET_VARIABLE_NAME},`,
      `${CALL_FUNCTION_NAME},`,
    ]),
    `}) => {`,
    ...indentLines(bodyLines),
    `}`,
  ];
}

