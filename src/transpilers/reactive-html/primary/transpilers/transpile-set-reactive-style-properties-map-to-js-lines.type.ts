import { ILines } from '../../../misc/lines/lines.type';

export interface ITranspileSetReactiveStylePropertiesMapToJSLinesOptions {
  node: ILines;
  value: ILines;
}

export interface ITranspileSetReactiveStylePropertiesMapToJSLinesFunction {
  (
    options: ITranspileSetReactiveStylePropertiesMapToJSLinesOptions,
  ): ILines;
}

export interface ITranspileSetReactiveStylePropertiesMapToJSLinesTrait {
  transpileSetReactiveStylePropertiesMapToJSLines: ITranspileSetReactiveStylePropertiesMapToJSLinesFunction;
}
