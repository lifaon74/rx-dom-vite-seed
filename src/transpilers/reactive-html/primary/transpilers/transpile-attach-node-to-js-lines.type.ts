import { ILines } from '../../../misc/lines/lines.type';

export interface ITranspileAttachNodeToJSLinesOptions {
  node: ILines;
  parentNode: ILines;
}

export interface ITranspileAttachNodeToJSLinesFunction {
  (
    options: ITranspileAttachNodeToJSLinesOptions,
  ): ILines;
}

export interface ITranspileAttachNodeToJSLinesTrait {
  transpileAttachNodeToJSLines: ITranspileAttachNodeToJSLinesFunction;
}


