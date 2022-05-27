import { ILinesOrNull } from '../../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../../require-external/require-external-function.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLRXChildTemplateToJSLines,
  transpileReactiveHTMLRXChildTemplateToJSLines,
} from '../../helpers/transpile-reactive-html-rx-child-template-to-js-lines';

const TAG_NAME: string = 'rx-async-pending';
const COMMAND_NAME: string = '*async-pending';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLRXAsyncPendingToJSLines = IRequireExternalFunctionKeyForTranspileReactiveHTMLRXChildTemplateToJSLines;

export function transpileReactiveHTMLRXAsyncPendingToJSLines(
  node: Element,
  templateName: string,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLRXAsyncPendingToJSLines>,
): ILinesOrNull {
  return transpileReactiveHTMLRXChildTemplateToJSLines(
    node,
    TAG_NAME,
    () => null,
    COMMAND_NAME,
    () => null,
    templateName,
    requireExternalFunction,
  );
}


