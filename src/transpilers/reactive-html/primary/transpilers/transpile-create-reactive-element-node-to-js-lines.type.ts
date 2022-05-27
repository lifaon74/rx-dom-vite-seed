import { ILines } from '../../../misc/lines/lines.type';

export interface ITranspileCreateReactiveElementNodeToJSLinesOptions {
  namespaceURI: string,
  name: string,
  options?: ElementCreationOptions,
}

export interface ITranspileCreateReactiveElementNodeToJSLinesFunction {
  (
    options: ITranspileCreateReactiveElementNodeToJSLinesOptions,
  ): ILines;
}

export interface ITranspileCreateReactiveElementNodeToJSLinesTrait {
  transpileCreateReactiveElementNodeToJSLines: ITranspileCreateReactiveElementNodeToJSLinesFunction;
}
