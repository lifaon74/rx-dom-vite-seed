import { ILines } from '../../../misc/lines/lines.type';

export interface ITranspileCreateStaticTextNodeToJSLinesOptions {
  value: ILines;
}

export interface ITranspileCreateStaticTextNodeToJSLinesFunction {
  (
    options: ITranspileCreateStaticTextNodeToJSLinesOptions,
  ): ILines;
}

export interface ITranspileCreateStaticTextNodeToJSLinesTrait {
  transpileCreateStaticTextNodeToJSLines: ITranspileCreateStaticTextNodeToJSLinesFunction;
}
