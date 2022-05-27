import { ILines } from '../../../misc/lines/lines.type';

export type ITranspileCreateReactiveCustomElementNodeToJSLinesOptionsSlotsMap = Map<string, ILines>;

export interface ITranspileCreateReactiveCustomElementNodeToJSLinesOptions {
  name: string,
  slots: ITranspileCreateReactiveCustomElementNodeToJSLinesOptionsSlotsMap;
}

export interface ITranspileCreateReactiveCustomElementNodeToJSLinesFunction {
  (
    options: ITranspileCreateReactiveCustomElementNodeToJSLinesOptions,
  ): ILines;
}

export interface ITranspileCreateReactiveCustomElementNodeToJSLinesTrait {
  transpileCreateReactiveCustomElementNodeToJSLines: ITranspileCreateReactiveCustomElementNodeToJSLinesFunction;
}
