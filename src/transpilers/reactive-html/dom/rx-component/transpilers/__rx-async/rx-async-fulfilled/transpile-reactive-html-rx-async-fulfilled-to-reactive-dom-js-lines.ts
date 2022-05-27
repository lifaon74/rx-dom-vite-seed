import { ILinesOrNull } from '../../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../../require-external/require-external-function.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLRXChildTemplateToJSLines,
  transpileReactiveHTMLRXChildTemplateToJSLines,
} from '../../helpers/transpile-reactive-html-rx-child-template-to-js-lines';
import {
  getCommentTemplateArgumentForTranspileReactiveHTMLRXAsyncFulfilledOrRejectedToJSLines,
} from '../shared/get-command-template-argument-for-transpile-reactive-html-rx-async-fulfilled-or-rejected-to-reactive-dom-js-lines';
import {
  getTagTemplateArgumentForTranspileReactiveHTMLRXAsyncFulfilledOrRejectedToJSLines,
} from '../shared/get-tag-template-argument-for-transpile-reactive-html-rx-async-fulfilled-or-rejected-to-reactive-dom-js-lines';

const TAG_NAME: string = 'rx-async-fulfilled';
const COMMAND_NAME: string = '*async-fulfilled';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLRXAsyncFulfilledToJSLines = IRequireExternalFunctionKeyForTranspileReactiveHTMLRXChildTemplateToJSLines;

export function transpileReactiveHTMLRXAsyncFulfilledToJSLines(
  node: Element,
  templateName: string,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLRXAsyncFulfilledToJSLines>,
): ILinesOrNull {
  return transpileReactiveHTMLRXChildTemplateToJSLines(
    node,
    TAG_NAME,
    getTagTemplateArgumentForTranspileReactiveHTMLRXAsyncFulfilledOrRejectedToJSLines,
    COMMAND_NAME,
    getCommentTemplateArgumentForTranspileReactiveHTMLRXAsyncFulfilledOrRejectedToJSLines,
    templateName,
    requireExternalFunction,
  );
}


