import { getElementTagName } from '../../../../../../misc/dom/get-element-tag-name';
import { isElementNode } from '../../../../../../misc/dom/is/is-element-node';
import { isTextNode } from '../../../../../../misc/dom/is/is-text-node';
import { wrapLinesWithCurlyBrackets } from '../../../../../misc/lines/functions/wrap-lines-with-curly-brackets';
import { ILinesOrNull } from '../../../../../misc/lines/lines-or-null.type';
import { ILines } from '../../../../../misc/lines/lines.type';
import { generateOptionalTemplateVariableName } from '../../../../../misc/templates/generate-template-variable-name';
import { NULL_TEMPLATE } from '../../../../../misc/templates/null-template.constant';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';
import {
  extractRXAttributesFromReactiveHTMLAttribute,
  IMappedAttributes,
} from '../helpers/extract-rx-attributes-from-reactive-html-attribute';
import {
  generateJSLinesForLocalTemplateFromRXContainerElement,
} from '../helpers/generate-js-lines-for-local-template-from-rx-container-element';
import { generateJSLinesForRXIf } from './generate-js-lines-for-rx-if';
import { transpileReactiveHTMLRXIfFalseToJSLines } from './rx-if-false/transpile-reactive-html-rx-if-false-to-js-lines';
import { transpileReactiveHTMLRXIfTrueToJSLines } from './rx-if-true/transpile-reactive-html-rx-if-true-to-js-lines';

/*
Syntax:

<rx-if
  condition="conditionObservable"
  true="templateReferenceNameTrue"
  false="templateReferenceNameFalse"
></rx-if>

 */

/*
Syntax - alternative:

<element
  *if="conditionObservable"
>
  ...content
</element>

====> equivalent

<rx-template
  name="uuid"
>
  ...content
</rx-template>
<rx-if
  condition="conditionObservable"
  true="uuid"
></rx-if>

 */

const TAG_NAME: string = 'rx-if';
const COMMAND_NAME: string = '*if';

const CONDITION_ATTRIBUTE_NAME: string = 'condition';
const TEMPLATE_TRUE_ATTRIBUTE_NAME: string = 'true';
const TEMPLATE_FALSE_ATTRIBUTE_NAME: string = 'false';

const LOCAL_TEMPLATE_NAME: string = 'template';

const LOCAL_TEMPLATE_TRUE_NAME: string = 'template_true';
const LOCAL_TEMPLATE_FALSE_NAME: string = 'template_false';

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  CONDITION_ATTRIBUTE_NAME,
  TEMPLATE_TRUE_ATTRIBUTE_NAME,
  TEMPLATE_FALSE_ATTRIBUTE_NAME,
]);

export interface ITranspileReactiveHTMLRXIfToJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
}

export function transpileReactiveHTMLRXIfToJSLines(
  {
    node,
    ...options
  }: ITranspileReactiveHTMLRXIfToJSLinesOptions,
): ILinesOrNull {
  const name: string = getElementTagName(node);
  if (name === TAG_NAME) {
    const attributes: IMappedAttributes = extractRXAttributesFromReactiveHTMLAttribute(
      node.attributes,
      ATTRIBUTE_NAMES,
    );
    const condition: string | undefined = attributes.get(CONDITION_ATTRIBUTE_NAME);

    if (condition === void 0) {
      throw new Error(`Missing attribute '${CONDITION_ATTRIBUTE_NAME}'`);
    }

    let templateTrue: string = generateOptionalTemplateVariableName(attributes.get(TEMPLATE_TRUE_ATTRIBUTE_NAME));
    let templateFalse: string = generateOptionalTemplateVariableName(attributes.get(TEMPLATE_FALSE_ATTRIBUTE_NAME));

    const childNodes: ArrayLike<ChildNode> = node.childNodes;
    const childLines: ILines = [];

    for (let i = 0, l = childNodes.length; i < l; i++) {
      const childNode: ChildNode = childNodes[i];
      if (isElementNode(childNode)) {
        const result: ILinesOrNull = transpileReactiveHTMLRXIfTrueToJSLines({
          ...options,
          node: childNode,
          templateName: LOCAL_TEMPLATE_TRUE_NAME,
        });
        if (result === null) {
          const result: ILinesOrNull = transpileReactiveHTMLRXIfFalseToJSLines({
            ...options,
            node: childNode,
            templateName: LOCAL_TEMPLATE_FALSE_NAME,
          });
          if (result === null) {
            throw new Error(`Found invalid element '${getElementTagName(childNode)}'`);
          } else if (templateFalse === NULL_TEMPLATE) {
            templateFalse = LOCAL_TEMPLATE_FALSE_NAME;
            childLines.push(...result);
          } else {
            throw new Error(`The template '${TEMPLATE_FALSE_ATTRIBUTE_NAME}' is already defined`);
          }
        } else if (templateTrue === NULL_TEMPLATE) {
          templateTrue = LOCAL_TEMPLATE_TRUE_NAME;
          childLines.push(...result);
        } else {
          throw new Error(`The template '${TEMPLATE_TRUE_ATTRIBUTE_NAME}' is already defined`);
        }
      } else if (isTextNode(childNode) && (childNode.data.trim() !== '')) {
        throw new Error(`The content of ${TAG_NAME} should not contain any Text Node`);
      }
    }

    if (
      (templateTrue === NULL_TEMPLATE)
      && (templateFalse === NULL_TEMPLATE)
    ) {
      throw new Error(`At least '${TEMPLATE_TRUE_ATTRIBUTE_NAME}' or '${TEMPLATE_FALSE_ATTRIBUTE_NAME}' attribute must be present`);
    }

    const lines: ILines = generateJSLinesForRXIf({
      ...options,
      condition,
      templateTrue,
      templateFalse,
    });

    return (
      (childLines.length > 0)
        ? wrapLinesWithCurlyBrackets([
          ...childLines,
          ...lines,
        ], false)
        : lines
    );
  } else if (node.hasAttribute(COMMAND_NAME)) {
    const condition: string = node.getAttribute(COMMAND_NAME) as string;
    node.removeAttribute(COMMAND_NAME);

    return wrapLinesWithCurlyBrackets([
      ...generateJSLinesForLocalTemplateFromRXContainerElement({
        ...options,
        node,
        templateName: LOCAL_TEMPLATE_NAME,
        argumentsLines: null,
      }),
      ...generateJSLinesForRXIf({
        ...options,
        condition,
        templateTrue: LOCAL_TEMPLATE_NAME,
        templateFalse: NULL_TEMPLATE,
      }),
    ], false);
  } else {
    return null;
  }
}


