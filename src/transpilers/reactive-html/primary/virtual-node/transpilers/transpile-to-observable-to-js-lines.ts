import { inlineLastLines } from '../../../../misc/lines/functions/after-last-line';
import { wrapLinesWithRoundBrackets } from '../../../../misc/lines/functions/wrap-lines-with-round-brackets';
import { ILines } from '../../../../misc/lines/lines.type';
import {
  ITranspileToObservableToJSLinesFunction,
  ITranspileToObservableToJSLinesOptions,
} from '../../transpilers/transpile-to-observable-to-js-lines.type';

export const transpileToObservableToJSLines: ITranspileToObservableToJSLinesFunction = (
  {
    value,
  }: ITranspileToObservableToJSLinesOptions,
): ILines => {
  return inlineLastLines(
    [`toObservableThrowIfUndefined`],
    wrapLinesWithRoundBrackets(value),
  );
};




