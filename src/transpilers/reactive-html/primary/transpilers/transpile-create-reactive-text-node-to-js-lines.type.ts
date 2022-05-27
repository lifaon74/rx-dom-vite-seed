import { ILines } from '../../../misc/lines/lines.type';

export interface ITranspileCreateReactiveTextNodeToJSLinesOptions {
  value: ILines;
}

export interface ITranspileCreateReactiveTextNodeToJSLinesFunction {
  (
    options: ITranspileCreateReactiveTextNodeToJSLinesOptions,
  ): ILines;
}

export interface ITranspileCreateReactiveTextNodeToJSLinesTrait {
  transpileCreateReactiveTextNodeToJSLines: ITranspileCreateReactiveTextNodeToJSLinesFunction;
}
