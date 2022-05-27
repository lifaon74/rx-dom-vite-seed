import { inlineLastLines } from '../../../../misc/lines/functions/after-last-line';
import { ILines } from '../../../../misc/lines/lines.type';
import {
  ITranspileSetReactiveInputToJSLinesFunction,
  ITranspileSetReactiveInputToJSLinesOptions,
} from '../../transpilers/transpile-set-reactive-input-to-js-lines.type';

export const transpileSetReactiveInputToJSLines: ITranspileSetReactiveInputToJSLinesFunction = (
  {
    node,
    name,
    value,
  }: ITranspileSetReactiveInputToJSLinesOptions,
): ILines => {
  return inlineLastLines(
    node,
    [`.setReactiveInput(`],
    name,
    [', '],
    value,
    [');'],
  );
};


