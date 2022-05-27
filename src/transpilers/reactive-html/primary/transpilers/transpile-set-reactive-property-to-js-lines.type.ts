import { ILines } from '../../../misc/lines/lines.type';

export interface ITranspileSetReactivePropertyToJSLinesOptions {
  node: ILines;
  name: ILines;
  value: ILines;
}

export interface ITranspileSetReactivePropertyToJSLinesFunction {
  (
    options: ITranspileSetReactivePropertyToJSLinesOptions,
  ): ILines;
}

export interface ITranspileSetReactivePropertyToJSLinesTrait {
  transpileSetReactivePropertyToJSLines: ITranspileSetReactivePropertyToJSLinesFunction;
}
