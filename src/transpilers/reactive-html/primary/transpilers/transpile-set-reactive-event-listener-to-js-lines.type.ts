import { ILines } from '../../../misc/lines/lines.type';

export interface ITranspileSetReactiveEventListenerToJSLinesOptions {
  node: ILines;
  name: ILines;
  value: ILines;
}

export interface ITranspileSetReactiveEventListenerToJSLinesFunction {
  (
    options: ITranspileSetReactiveEventListenerToJSLinesOptions,
  ): ILines;
}

export interface ITranspileSetReactiveEventListenerToJSLinesTrait {
  transpileSetReactiveEventListenerToJSLines: ITranspileSetReactiveEventListenerToJSLinesFunction;
}
