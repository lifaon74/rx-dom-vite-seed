import { ILines } from '../../../misc/lines/lines.type';

export interface ITranspileCreateReactiveIfNodeToJSLinesOptions {
  condition: ILines;
  templateTrue: ILines;
  templateFalse: ILines;
}

export interface ITranspileCreateReactiveIfNodeToJSLinesFunction {
  (
    options: ITranspileCreateReactiveIfNodeToJSLinesOptions,
  ): ILines;
}

export interface ITranspileCreateReactiveIfNodeToJSLinesTrait {
  transpileCreateReactiveIfNodeToJSLines: ITranspileCreateReactiveIfNodeToJSLinesFunction;
}
