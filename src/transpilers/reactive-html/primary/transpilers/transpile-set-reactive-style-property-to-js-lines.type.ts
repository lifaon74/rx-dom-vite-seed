import { ILines } from '../../../misc/lines/lines.type';

export interface ITranspileSetReactiveStylePropertyToJSLinesOptions {
  node: ILines;
  name: ILines;
  value: ILines;
}

export interface ITranspileSetReactiveStylePropertyToJSLinesFunction {
  (
    options: ITranspileSetReactiveStylePropertyToJSLinesOptions,
  ): ILines;
}

export interface ITranspileSetReactiveStylePropertyToJSLinesTrait {
  transpileSetReactiveStylePropertyToJSLines: ITranspileSetReactiveStylePropertyToJSLinesFunction;
}
