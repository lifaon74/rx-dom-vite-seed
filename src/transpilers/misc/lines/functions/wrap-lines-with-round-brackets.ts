import { ILines } from '../lines.type';
import { wrapLinesWithBrackets } from './wrap-lines-with-brackets';

export function wrapLinesWithRoundBrackets(
  lines: ILines,
): ILines {
  return wrapLinesWithBrackets('(', lines, ')');
}
