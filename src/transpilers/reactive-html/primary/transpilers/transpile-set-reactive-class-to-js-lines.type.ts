import { ILines } from '../../../misc/lines/lines.type';

export interface ITranspileSetReactiveClassToJSLinesOptions {
  node: ILines;
  name: ILines;
  value: ILines;
}

export interface ITranspileSetReactiveClassToJSLinesFunction {
  (
    options: ITranspileSetReactiveClassToJSLinesOptions,
  ): ILines;
}

export interface ITranspileSetReactiveClassToJSLinesTrait {
  transpileSetReactiveClassToJSLines: ITranspileSetReactiveClassToJSLinesFunction;
}
