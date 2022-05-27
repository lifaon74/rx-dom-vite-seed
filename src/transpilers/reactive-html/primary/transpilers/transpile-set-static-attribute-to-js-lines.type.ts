import { ILines } from '../../../misc/lines/lines.type';

export interface ITranspileSetStaticAttributeToJSLinesOptions {
  node: ILines;
  name: ILines;
  value: ILines;
}

export interface ITranspileSetStaticAttributeToJSLinesFunction {
  (
    options: ITranspileSetStaticAttributeToJSLinesOptions,
  ): ILines;
}

export interface ITranspileSetStaticAttributeToJSLinesTrait {
  transpileSetStaticAttributeToJSLines: ITranspileSetStaticAttributeToJSLinesFunction;
}
