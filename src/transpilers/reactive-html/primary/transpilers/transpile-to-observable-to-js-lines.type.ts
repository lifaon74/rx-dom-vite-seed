import { ILines } from '../../../misc/lines/lines.type';

export interface ITranspileToObservableToJSLinesOptions {
  value: ILines;
}

export interface ITranspileToObservableToJSLinesFunction {
  (
    options: ITranspileToObservableToJSLinesOptions,
  ): ILines;
}

export interface ITranspileToObservableToJSLinesTrait {
  transpileToObservableToJSLines: ITranspileToObservableToJSLinesFunction;
}


