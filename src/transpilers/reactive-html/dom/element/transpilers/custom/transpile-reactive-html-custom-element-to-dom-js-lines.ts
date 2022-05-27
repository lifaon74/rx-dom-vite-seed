import { getElementNameSpaceURI } from '../../../../../../misc/dom/get-element-name-space-uri';
import { getElementTagName } from '../../../../../../misc/dom/get-element-tag-name';
import { HTML_NAMESPACE_URI_CONSTANT } from '../../../../../../misc/namespace-uri/html-namespace-uri.constant';
import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { wrapLinesWithCurlyBrackets } from '../../../../../misc/lines/functions/wrap-lines-with-curly-brackets';
import { ILinesOrNull } from '../../../../../misc/lines/lines-or-null.type';
import { ILines } from '../../../../../misc/lines/lines.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';
import {
  ITranspileCreateReactiveCustomElementNodeToJSLinesOptionsSlotsMap,
} from '../../../../primary/transpilers/transpile-create-reactive-custom-element-node-to-js-lines.type';
import { transpileReactiveHTMLAttributesToJSLines } from '../../../attributes/transpile-reactive-html-attributes-to-js-lines';
import {
  transpileReactiveHTMLCustomElementChildrenToSlotsOfJSLines,
} from './slots/transpile-reactive-html-custom-element-children-to-slots-of-js-lines';

export interface ITranspileReactiveHTMLCustomElementToJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
}

export function transpileReactiveHTMLCustomElementToJSLines(
  {
    node,
    transpilers,
  }: ITranspileReactiveHTMLCustomElementToJSLinesOptions,
): ILinesOrNull {
  const namespaceURI: string = getElementNameSpaceURI(node);
  const name: string = getElementTagName(node);
  const isCustomElement: boolean = (namespaceURI === HTML_NAMESPACE_URI_CONSTANT)
    && name.includes('-')
    && !node.hasAttribute('*external');

  if (isCustomElement) {
    const {
      transpileAttachNodeToJSLines,
      transpileCreateReactiveCustomElementNodeToJSLines,
    } = transpilers;

    const slots: ITranspileCreateReactiveCustomElementNodeToJSLinesOptionsSlotsMap = transpileReactiveHTMLCustomElementChildrenToSlotsOfJSLines({
      nodes: node.childNodes,
      transpilers,
    });

    const elementLines: ILines = [
      `// element '${name}'`,
      ...inlineLastLines(
        [`const node = (`],
        transpileCreateReactiveCustomElementNodeToJSLines({
          name,
          slots,
        }),
        [');'],
      ),
    ];

    const attachNodeLines: ILines = transpileAttachNodeToJSLines({
      node: ['node'],
      parentNode: ['parentNode'],
    });

    const transpiledAttributes: ILinesOrNull = transpileReactiveHTMLAttributesToJSLines({
      attributes: node.attributes,
      transpilers,
    });
    const attributesLines: ILines = (transpiledAttributes === null)
      ? []
      : [
        `// attributes`,
        ...transpiledAttributes,
      ];

    return wrapLinesWithCurlyBrackets([
      ...elementLines,
      ...attributesLines,
      ...attachNodeLines,
    ]);

  } else {
    return null;
  }
}

