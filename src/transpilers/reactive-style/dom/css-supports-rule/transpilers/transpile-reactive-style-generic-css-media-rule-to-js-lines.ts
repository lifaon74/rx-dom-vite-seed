import { ILinesOrNull } from '../../../../misc/lines/lines-or-null.type';
import { IHavingHostSelectorOptions } from '../../../types/having-host-selector-options';
import {
  transpileReactiveStyleCSSGroupingRuleToCSSLines,
} from '../../css-grouping-rule/transpile-reactive-style-css-grouping-rule-to-js-lines';

export interface ITranspileReactiveStyleGenericCSSSupportsRuleToCSSLinesOptions extends IHavingHostSelectorOptions {
  rule: CSSSupportsRule;
}

export function transpileReactiveStyleGenericCSSSupportsRuleToCSSLines(
  options: ITranspileReactiveStyleGenericCSSSupportsRuleToCSSLinesOptions,
): ILinesOrNull {
  return transpileReactiveStyleCSSGroupingRuleToCSSLines(options);
}



