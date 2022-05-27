import { ILines } from '../../../misc/lines/lines.type';

export interface ITranspileSetReactiveClassNamesListToJSLinesOptions {
  node: ILines;
  value: ILines;
}

export interface ITranspileSetReactiveClassNamesListToJSLinesFunction {
  (
    options: ITranspileSetReactiveClassNamesListToJSLinesOptions,
  ): ILines;
}

export interface ITranspileSetReactiveClassNamesListToJSLinesTrait {
  transpileSetReactiveClassNamesListToJSLines: ITranspileSetReactiveClassNamesListToJSLinesFunction;
}
