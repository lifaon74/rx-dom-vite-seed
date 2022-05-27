import { getAttributeValue } from '../../../../../../light-dom/attribute/get-attribute-value';
import { hasAttribute } from '../../../../../../light-dom/attribute/has-attribute';
import { removeAttribute } from '../../../../../../light-dom/attribute/remove-attribute';
import { getChildNodes } from '../../../../../../light-dom/node/properties/get-child-nodes';
import { getTagName } from '../../../../../../light-dom/node/properties/get-tag-name';
import { isElementNode } from '../../../../../../light-dom/node/type/is-element-node';
import { isTextNode } from '../../../../../../light-dom/node/type/is-text-node';
import { generateOptionalTemplateVariableName } from '../../../../../helpers/generate-template-variable-name';
import { scopeLines } from '../../../../../helpers/lines-formatting-helpers';
import { NULL_TEMPLATE } from '../../../../../helpers/null-template.constant';
import { ILines, ILinesOrNull } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  extractRXAttributesFromReactiveHTMLAttribute,
  IMappedAttributes,
} from '../helpers/extract-rx-attributes-from-reactive-html-attribute';
import {
  generateJSLinesForLocalTemplateFromRXContainerElement,
  IRequireExternalFunctionKeyForGenerateJSLinesForLocalTemplateFromRXContainerElement,
} from '../helpers/generate-js-lines-for-local-template-from-rx-container-element';
import {
  generateJSLinesForRXAsync,
  IRequireExternalFunctionKeyForGenerateJSLinesForRXAsync,
} from './generate-reactive-dom-js-lines-for-rx-async';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLRXAsyncFulfilledToJSLines,
  transpileReactiveHTMLRXAsyncFulfilledToJSLines,
} from './rx-async-fulfilled/transpile-reactive-html-rx-async-fulfilled-to-reactive-dom-js-lines';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLRXAsyncPendingToJSLines,
  transpileReactiveHTMLRXAsyncPendingToJSLines,
} from './rx-async-pending/transpile-reactive-html-rx-async-pending-to-reactive-dom-js-lines';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLRXAsyncRejectedToJSLines,
  transpileReactiveHTMLRXAsyncRejectedToJSLines,
} from './rx-async-rejected/transpile-reactive-html-rx-async-rejected-to-reactive-dom-js-lines';

/*
Syntax:

<rx-async
  expression="observable"
  pending="templatePending"
  fulfilled="templateFulfilled"
  rejected="rejectedRejected"
></rx-async>

 */

/*
Syntax - alternative:

<element
  *async="observable"
>
  ...content
</element>

====> equivalent

<rx-template
  name="uuid"
>
  ...content
</rx-template>
<rx-async
  observable="observable"
  fulfilled="uuid"
></rx-async>

 */

const TAG_NAME: string = 'rx-async';
const COMMAND_NAME: string = '*async';

const EXPRESSION_ATTRIBUTE_NAME: string = 'expression';
const TEMPLATE_PENDING_ATTRIBUTE_NAME: string = 'pending';
const TEMPLATE_FULFILLED_ATTRIBUTE_NAME: string = 'fulfilled';
const TEMPLATE_REJECTED_ATTRIBUTE_NAME: string = 'rejected';

const LOCAL_TEMPLATE_ARGUMENTS_LINES: ILines = [`{ value }`];

const LOCAL_TEMPLATE_NAME: string = 'template';

const LOCAL_TEMPLATE_PENDING_NAME: string = 'template_pending';
const LOCAL_TEMPLATE_FULFILLED_NAME: string = 'template_fulfilled';
const LOCAL_TEMPLATE_REJECTED_NAME: string = 'template_rejected';

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  EXPRESSION_ATTRIBUTE_NAME,
  TEMPLATE_PENDING_ATTRIBUTE_NAME,
  TEMPLATE_FULFILLED_ATTRIBUTE_NAME,
  TEMPLATE_REJECTED_ATTRIBUTE_NAME,
]);

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLRXAsyncToJSLines =
  | IRequireExternalFunctionKeyForGenerateJSLinesForRXAsync
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLRXAsyncPendingToJSLines
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLRXAsyncFulfilledToJSLines
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLRXAsyncRejectedToJSLines
  | IRequireExternalFunctionKeyForGenerateJSLinesForLocalTemplateFromRXContainerElement
  ;

export function transpileReactiveHTMLRXAsyncToJSLines(
  node: Element,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLRXAsyncToJSLines>,
): ILinesOrNull {
  const name: string = getTagName(node);
  if (name === TAG_NAME) {
    const attributes: IMappedAttributes = extractRXAttributesFromReactiveHTMLAttribute(
      node.attributes,
      ATTRIBUTE_NAMES,
    );

    const expression: string | undefined = attributes.get(EXPRESSION_ATTRIBUTE_NAME);

    if (expression === void 0) {
      throw new Error(`Missing attribute '${EXPRESSION_ATTRIBUTE_NAME}'`);
    }

    let templatePending: string = generateOptionalTemplateVariableName(attributes.get(TEMPLATE_PENDING_ATTRIBUTE_NAME));
    let templateFulfilled: string = generateOptionalTemplateVariableName(attributes.get(TEMPLATE_FULFILLED_ATTRIBUTE_NAME));
    let templateRejected: string = generateOptionalTemplateVariableName(attributes.get(TEMPLATE_REJECTED_ATTRIBUTE_NAME));

    const childNodes: ChildNode[] = getChildNodes(node);
    const childLines: ILines = [];

    for (let i = 0, l = childNodes.length; i < l; i++) {
      const childNode: ChildNode = childNodes[i];
      if (isElementNode(childNode)) {
        const result: ILinesOrNull = transpileReactiveHTMLRXAsyncPendingToJSLines(
          childNode,
          LOCAL_TEMPLATE_PENDING_NAME,
          requireExternalFunction,
        );
        if (result === null) {
          const result: ILinesOrNull = transpileReactiveHTMLRXAsyncFulfilledToJSLines(
            childNode,
            LOCAL_TEMPLATE_FULFILLED_NAME,
            requireExternalFunction,
          );
          if (result === null) {
            const result: ILinesOrNull = transpileReactiveHTMLRXAsyncRejectedToJSLines(
              childNode,
              LOCAL_TEMPLATE_REJECTED_NAME,
              requireExternalFunction,
            );
            if (result === null) {
              throw new Error(`Found invalid element '${getTagName(childNode)}'`);
            } else if (templateRejected === NULL_TEMPLATE) {
              templateRejected = LOCAL_TEMPLATE_REJECTED_NAME;
              childLines.push(...result);
            } else {
              throw new Error(`The template '${TEMPLATE_REJECTED_ATTRIBUTE_NAME}' is already defined`);
            }
          } else if (templateFulfilled === NULL_TEMPLATE) {
            templateFulfilled = LOCAL_TEMPLATE_FULFILLED_NAME;
            childLines.push(...result);
          } else {
            throw new Error(`The template '${TEMPLATE_FULFILLED_ATTRIBUTE_NAME}' is already defined`);
          }
        } else if (templatePending === NULL_TEMPLATE) {
          templatePending = LOCAL_TEMPLATE_PENDING_NAME;
          childLines.push(...result);
        } else {
          throw new Error(`The template '${TEMPLATE_PENDING_ATTRIBUTE_NAME}' is already defined`);
        }
      } else if (isTextNode(childNode) && (childNode.data.trim() !== '')) {
        throw new Error(`The content of ${TAG_NAME} should not contain any Text Node`);
      }
    }

    if (
      (templatePending === NULL_TEMPLATE)
      && (templateFulfilled === NULL_TEMPLATE)
      && (templateRejected === NULL_TEMPLATE)
    ) {
      throw new Error(`At least '${TEMPLATE_PENDING_ATTRIBUTE_NAME}', '${TEMPLATE_FULFILLED_ATTRIBUTE_NAME} or '${TEMPLATE_REJECTED_ATTRIBUTE_NAME}' attribute must be present`);
    }

    const lines: ILines = generateJSLinesForRXAsync(
      expression,
      templatePending,
      templateFulfilled,
      templateRejected,
      requireExternalFunction,
    );

    return (
      (childLines.length > 0)
        ? scopeLines([
          ...childLines,
          ...lines,
        ])
        : lines
    );
  } else if (hasAttribute(node, COMMAND_NAME)) {
    const expression: string = getAttributeValue(node, COMMAND_NAME) as string;
    removeAttribute(node, COMMAND_NAME);

    return scopeLines([
      ...generateJSLinesForLocalTemplateFromRXContainerElement(
        node,
        LOCAL_TEMPLATE_NAME,
        LOCAL_TEMPLATE_ARGUMENTS_LINES,
        requireExternalFunction,
      ),
      ...generateJSLinesForRXAsync(
        expression,
        NULL_TEMPLATE,
        LOCAL_TEMPLATE_NAME,
        NULL_TEMPLATE,
        requireExternalFunction,
      ),
    ]);
  } else {
    return null;
  }
}

