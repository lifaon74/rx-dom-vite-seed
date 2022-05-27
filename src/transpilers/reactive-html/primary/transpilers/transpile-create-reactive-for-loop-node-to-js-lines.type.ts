import { ILinesOrNull } from '../../../misc/lines/lines-or-null.type';
import { ILines } from '../../../misc/lines/lines.type';

export interface ITranspileCreateReactiveForLoopNodeToJSLinesOptions {
  items: ILines;
  template: ILines,
  trackBy: ILinesOrNull,
}

export interface ITranspileCreateReactiveForLoopNodeToJSLinesFunction {
  (
    options: ITranspileCreateReactiveForLoopNodeToJSLinesOptions,
  ): ILines;
}

export interface ITranspileCreateReactiveForLoopNodeToJSLinesTrait {
  transpileCreateReactiveForLoopNodeToJSLines: ITranspileCreateReactiveForLoopNodeToJSLinesFunction;
}
