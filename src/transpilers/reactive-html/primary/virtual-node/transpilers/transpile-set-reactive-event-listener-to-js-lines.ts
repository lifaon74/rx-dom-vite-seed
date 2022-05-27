import { inlineLastLines } from '../../../../misc/lines/functions/after-last-line';
import { ILines } from '../../../../misc/lines/lines.type';
import {
  ITranspileSetReactiveEventListenerToJSLinesFunction,
  ITranspileSetReactiveEventListenerToJSLinesOptions,
} from '../../transpilers/transpile-set-reactive-event-listener-to-js-lines.type';

export const transpileSetReactiveEventListenerToJSLines: ITranspileSetReactiveEventListenerToJSLinesFunction = (
  {
    node,
    name,
    value,
  }: ITranspileSetReactiveEventListenerToJSLinesOptions,
): ILines => {
  return inlineLastLines(
    node,
    [`.on$(`],
    name,
    [')('],
    value,
    [');'],
  );
};


