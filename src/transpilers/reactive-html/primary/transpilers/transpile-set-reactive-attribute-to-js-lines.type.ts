import { ILines } from '../../../misc/lines/lines.type';

export interface ITranspileSetReactiveAttributeToJSLinesOptions {
  node: ILines;
  name: ILines;
  value: ILines;
}

export interface ITranspileSetReactiveAttributeToJSLinesFunction {
  (
    options: ITranspileSetReactiveAttributeToJSLinesOptions,
  ): ILines;
}

export interface ITranspileSetReactiveAttributeToJSLinesTrait {
  transpileSetReactiveAttributeToJSLines: ITranspileSetReactiveAttributeToJSLinesFunction;
}
