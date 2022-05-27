import { getElementTagName } from '../../../../../../../misc/dom/get-element-tag-name';
import { throwIfHasChildNodes } from '../../../../../../../misc/dom/throw-if-has-child-nodes';
import { wrapLinesWithCurlyBrackets } from '../../../../../../misc/lines/functions/wrap-lines-with-curly-brackets';
import { ILinesOrNull } from '../../../../../../misc/lines/lines-or-null.type';
import { generateTemplateVariableName } from '../../../../../../misc/templates/generate-template-variable-name';
import { IHavingPrimaryTranspilersOptions } from '../../../../../primary/primary-transpilers.type';
import {
  extractRXAttributesFromReactiveHTMLAttribute,
  IMappedAttributes,
} from '../../helpers/extract-rx-attributes-from-reactive-html-attribute';
import {
  generateJSLinesForLocalTemplateFromRXContainerElement,
} from '../../helpers/generate-js-lines-for-local-template-from-rx-container-element';
import { generateJSLinesForRXSwitchDefault } from './generate-js-lines-for-rx-switch-default';

const TAG_NAME: string = 'rx-switch-default';
const COMMAND_NAME: string = '*switch-default';

const LOCAL_TEMPLATE_NAME: string = 'template';

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  LOCAL_TEMPLATE_NAME,
]);

export interface ITranspileReactiveHTMLRXSwitchDefaultToJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
  switchDefaultName: string;
}

export function transpileReactiveHTMLRXSwitchDefaultToJSLines(
  {
    node,
    switchDefaultName,
    ...options
  }: ITranspileReactiveHTMLRXSwitchDefaultToJSLinesOptions,
): ILinesOrNull {
  const name: string = getElementTagName(node);
  if (name === TAG_NAME) {
    const attributes: IMappedAttributes = extractRXAttributesFromReactiveHTMLAttribute(node.attributes, ATTRIBUTE_NAMES);
    const template: string | undefined = attributes.get(LOCAL_TEMPLATE_NAME);

    if (template === void 0) {
      throw new Error(`Missing attribute '${LOCAL_TEMPLATE_NAME}'`);
    }

    throwIfHasChildNodes(node);

    return generateJSLinesForRXSwitchDefault({
      switchDefaultName,
      template: generateTemplateVariableName(template),
    });
  } else if (node.hasAttribute(COMMAND_NAME)) {
    node.removeAttribute(COMMAND_NAME);

    return wrapLinesWithCurlyBrackets([
      ...generateJSLinesForLocalTemplateFromRXContainerElement({
        ...options,
        node,
        templateName: LOCAL_TEMPLATE_NAME,
        argumentsLines: null,
      }),
      ...generateJSLinesForRXSwitchDefault({
        switchDefaultName,
        template: LOCAL_TEMPLATE_NAME,
      }),
    ]);
  } else {
    return null;
  }
}


