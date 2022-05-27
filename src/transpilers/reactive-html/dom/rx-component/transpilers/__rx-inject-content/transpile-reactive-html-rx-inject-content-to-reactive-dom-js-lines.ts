import { getTagName } from '../../../../../../light-dom/node/properties/get-tag-name';
import { throwIfHasChildNodes } from '../../../../../../misc/dom/throw-if-has-child-nodes';
import { ILinesOrNull } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  extractRXAttributesFromReactiveHTMLAttribute,
  IMappedAttributes,
} from '../helpers/extract-rx-attributes-from-reactive-html-attribute';
import {
  generateJSLinesForRXInjectContent,
  IRequireExternalFunctionKeyForGenerateJSLinesForRXInjectContent,
} from './generate-reactive-dom-js-lines-for-rx-inject-content';

/*
Syntax:

<rx-inject-content
  content="observable"
></rx-inject-content>

 */

const TAG_NAME: string = 'rx-inject-content';

const CONTENT_ATTRIBUTE_NAME: string = 'content';

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  CONTENT_ATTRIBUTE_NAME,
]);

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLRXInjectContentToJSLines = IRequireExternalFunctionKeyForGenerateJSLinesForRXInjectContent;

export function transpileReactiveHTMLRXInjectContentToJSLines(
  node: Element,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLRXInjectContentToJSLines>,
): ILinesOrNull {
  const name: string = getTagName(node);
  if (name === TAG_NAME) {
    const attributes: IMappedAttributes = extractRXAttributesFromReactiveHTMLAttribute(node.attributes, ATTRIBUTE_NAMES);
    const template: string | undefined = attributes.get(CONTENT_ATTRIBUTE_NAME);

    if (template === void 0) {
      throw new Error(`Missing attribute '${ATTRIBUTE_NAMES}'`);
    }

    throwIfHasChildNodes(node);

    return generateJSLinesForRXInjectContent(template, requireExternalFunction);
  } else {
    return null;
  }
}


