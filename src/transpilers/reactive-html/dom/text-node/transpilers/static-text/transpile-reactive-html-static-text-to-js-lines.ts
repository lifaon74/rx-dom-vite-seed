import { ILinesOrNull } from '../../../../../misc/lines/lines-or-null.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';
import { generateJSLinesForStaticTextNode } from './generate-js-lines-for-static-text-node';

export interface ITranspileReactiveHTMLStaticTextToJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  value: string;
}

export function transpileReactiveHTMLStaticTextToJSLines(
  {
    value,
    ...options
  }: ITranspileReactiveHTMLStaticTextToJSLinesOptions,
): ILinesOrNull {
  return (value === '')
    ? null
    : generateJSLinesForStaticTextNode({
      ...options,
      value,
    });
}
