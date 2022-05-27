import { ILinesOrNull } from '../../../../misc/lines/lines-or-null.type';
import { IHavingHostSelectorOptions } from '../../../types/having-host-selector-options';
import { transpileReactiveStyleCSSMediaRuleToCSSLines } from '../../css-media-rule/transpile-reactive-style-css-media-rule-to-js-lines';
import { transpileReactiveStyleCSSStyleRuleToCSSLines } from '../../css-style-rule/transpile-reactive-style-css-style-rule-to-js-lines';
import {
  transpileReactiveStyleCSSSupportsRuleToCSSLines,
} from '../../css-supports-rule/transpile-reactive-style-css-media-rule-to-js-lines';

export interface ITranspileReactiveStyleGenericCSSRuleToCSSLinesOptions extends IHavingHostSelectorOptions {
  rule: CSSRule;
}

export function transpileReactiveStyleGenericCSSRuleToCSSLines(
  {
    rule,
    ...options
  }: ITranspileReactiveStyleGenericCSSRuleToCSSLinesOptions,
): ILinesOrNull {
  switch (rule.type) {
    case CSSRule.STYLE_RULE:
      return transpileReactiveStyleCSSStyleRuleToCSSLines({
        ...options,
        rule: rule as CSSStyleRule,
      });
    case CSSRule.MEDIA_RULE:
      return transpileReactiveStyleCSSMediaRuleToCSSLines({
        ...options,
        rule: rule as CSSMediaRule,
      });
    case CSSRule.SUPPORTS_RULE:
      return transpileReactiveStyleCSSSupportsRuleToCSSLines({
        ...options,
        rule: rule as CSSSupportsRule,
      });
    default:
      return null;
  }
}
