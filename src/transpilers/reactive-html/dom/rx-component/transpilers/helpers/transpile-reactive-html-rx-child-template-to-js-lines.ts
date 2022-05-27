import { getElementTagName } from '../../../../../../misc/dom/get-element-tag-name';
import { ILinesOrNull } from '../../../../../misc/lines/lines-or-null.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';
import { generateJSLinesForLocalTemplateFromNodes } from './generate-js-lines-for-local-template-from-nodes';
import { generateJSLinesForLocalTemplateFromRXContainerElement } from './generate-js-lines-for-local-template-from-rx-container-element';

export interface ITranspileReactiveHTMLRXChildTemplateToJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
  tagName: string,
  getTagTemplateArgument: (node: Element) => ILinesOrNull,
  commandName: string,
  getCommandTemplateArgument: (attributeValue: string) => ILinesOrNull,
  templateName: string,
}

export function transpileReactiveHTMLRXChildTemplateToJSLines(
  {
    node,
    tagName,
    getTagTemplateArgument,
    commandName,
    getCommandTemplateArgument,
    templateName,
    ...options
  }: ITranspileReactiveHTMLRXChildTemplateToJSLinesOptions,
): ILinesOrNull {
  const name: string = getElementTagName(node);
  if (name === tagName) {
    return [
      `// ${tagName}`,
      ...generateJSLinesForLocalTemplateFromNodes({
        ...options,
        nodes: node.childNodes,
        templateName,
        argumentsLines: getTagTemplateArgument(node),
      }),
    ];
  } else if (node.hasAttribute(commandName)) {
    const value: string = node.getAttribute(commandName) as string;
    node.removeAttribute(commandName);

    return [
      `// ${tagName}`,
      ...generateJSLinesForLocalTemplateFromRXContainerElement({
        ...options,
        node,
        templateName,
        argumentsLines: getCommandTemplateArgument(value),
      }),
    ];
  } else {
    return null;
  }
}


