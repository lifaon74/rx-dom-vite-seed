import { VariableReference } from '@fluent/syntax';
import { ILines } from '@lirx/dom';
import { GET_VARIABLE_NAME } from '../shared/get-variable-name.constants';

export interface ITranspileFluentVariableReferenceNodeToJSLinesOptions {
  variableReferenceNode: VariableReference;
}

export function transpileFluentVariableReferenceNodeToJSLines(
  {
    variableReferenceNode,
    ...options
  }: ITranspileFluentVariableReferenceNodeToJSLinesOptions,
): ILines {
  return [
    `${GET_VARIABLE_NAME}(${JSON.stringify(variableReferenceNode.id.name)})`,
  ];
}
