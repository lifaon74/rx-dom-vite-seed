import { ILinesOrNull } from '../../../misc/lines/lines-or-null.type';
import { ILines } from '../../../misc/lines/lines.type';

export interface ITranspileCreateReactiveSwitchNodeToJSLinesOptions {
  expression: ILines,
  templates: ILines;
  defaultTemplate: ILinesOrNull;
}

export interface ITranspileCreateReactiveSwitchNodeToJSLinesFunction {
  (
    options: ITranspileCreateReactiveSwitchNodeToJSLinesOptions,
  ): ILines;
}

export interface ITranspileCreateReactiveSwitchNodeToJSLinesTrait {
  transpileCreateReactiveSwitchNodeToJSLines: ITranspileCreateReactiveSwitchNodeToJSLinesFunction;
}
