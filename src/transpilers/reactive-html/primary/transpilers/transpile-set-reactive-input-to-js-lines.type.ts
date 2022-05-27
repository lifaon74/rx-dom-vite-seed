import { ILines } from '../../../misc/lines/lines.type';

export interface ITranspileSetReactiveInputToJSLinesOptions {
  node: ILines;
  name: ILines;
  value: ILines;
}

export interface ITranspileSetReactiveInputToJSLinesFunction {
  (
    options: ITranspileSetReactiveInputToJSLinesOptions,
  ): ILines;
}

export interface ITranspileSetReactiveInputToJSLinesTrait {
  transpileSetReactiveInputToJSLines: ITranspileSetReactiveInputToJSLinesFunction;
}
