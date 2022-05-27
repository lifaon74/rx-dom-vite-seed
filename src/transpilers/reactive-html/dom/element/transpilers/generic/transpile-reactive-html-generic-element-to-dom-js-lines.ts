import { getElementNameSpaceURI } from '../../../../../../misc/dom/get-element-name-space-uri';
import { getElementTagName } from '../../../../../../misc/dom/get-element-tag-name';
import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { wrapLinesWithCurlyBrackets } from '../../../../../misc/lines/functions/wrap-lines-with-curly-brackets';
import { ILinesOrNull } from '../../../../../misc/lines/lines-or-null.type';
import { ILines } from '../../../../../misc/lines/lines.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';
import { transpileReactiveHTMLAttributesToJSLines } from '../../../attributes/transpile-reactive-html-attributes-to-js-lines';
import { transpileReactiveHTMLNodesToJSLines } from '../../../nodes/transpile-reactive-html-nodes-to-js-lines';

export interface ITranspileReactiveHTMLGenericElementToJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
}

export function transpileReactiveHTMLGenericElementToJSLines(
  {
    node,
    transpilers,
  }: ITranspileReactiveHTMLGenericElementToJSLinesOptions,
): ILinesOrNull {
  const namespaceURI: string = getElementNameSpaceURI(node);
  const name: string = getElementTagName(node);
  const isAttribute: string | null = node.getAttribute('is');

  const elementOptions: ElementCreationOptions | undefined = (isAttribute === null)
    ? void 0
    : {
      is: isAttribute,
    };

  const {
    transpileAttachNodeToJSLines,
    transpileCreateReactiveElementNodeToJSLines,
  } = transpilers;

  const elementLines: ILines = [
    `// element '${name}'`,
    ...inlineLastLines(
      [`const node = (`],
      transpileCreateReactiveElementNodeToJSLines({
        namespaceURI,
        name,
        options: elementOptions,
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

  const transpiledChildren: ILinesOrNull = transpileReactiveHTMLNodesToJSLines({
    nodes: node.childNodes,
    transpilers,
  });

  const childrenLines: ILines = (transpiledChildren === null)
    ? []
    : wrapLinesWithCurlyBrackets([
      `// child nodes`,
      `const parentNode = node;`,
      ...transpiledChildren,
    ]);

  return wrapLinesWithCurlyBrackets([
    ...elementLines,
    ...attachNodeLines,
    ...attributesLines,
    ...childrenLines,
  ]);
}
