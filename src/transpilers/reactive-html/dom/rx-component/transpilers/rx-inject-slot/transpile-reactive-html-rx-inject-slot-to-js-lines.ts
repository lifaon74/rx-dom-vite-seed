import { getElementTagName } from '../../../../../../misc/dom/get-element-tag-name';
import { indentLines } from '../../../../../misc/lines/functions/indent-lines';
import { wrapLinesWithCurlyBrackets } from '../../../../../misc/lines/functions/wrap-lines-with-curly-brackets';
import { ILinesOrNull } from '../../../../../misc/lines/lines-or-null.type';
import { ILines } from '../../../../../misc/lines/lines.type';
import { NULL_TEMPLATE } from '../../../../../misc/templates/null-template.constant';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';
import { transpileReactiveHTMLElementToJSLines } from '../../../element/transpile-reactive-html-element-to-js-lines';
import { transpileReactiveHTMLNodesToJSLines } from '../../../nodes/transpile-reactive-html-nodes-to-js-lines';
import {
  extractRXAttributesFromReactiveHTMLAttribute,
  IMappedAttributes,
} from '../helpers/extract-rx-attributes-from-reactive-html-attribute';
import {
  generateJSLinesForLocalTemplateFromRXContainerElement
} from '../helpers/generate-js-lines-for-local-template-from-rx-container-element';
import { generateJSLinesForRXIf } from '../rx-if/generate-js-lines-for-rx-if';
import { generateJSLinesForRXInjectSlot } from './generate-js-lines-for-rx-inject-slot';

/*
Syntax:

<rx-inject-slot
  name="slotName"
>
  default content
</rx-inject-slot>

// <div *inject-slot="slotName">
//   default content
// </div>

 */

const TAG_NAME: string = 'rx-inject-slot';
const COMMAND_NAME: string = '*inject-slot';

const SLOT_NAME_ATTRIBUTE_NAME: string = 'name';

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  SLOT_NAME_ATTRIBUTE_NAME,
]);

export interface ITranspileReactiveHTMLRXInjectSlotToLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
}

export function transpileReactiveHTMLRXInjectSlotToLines(
  {
    node,
    ...options
  }: ITranspileReactiveHTMLRXInjectSlotToLinesOptions,
): ILinesOrNull {
  const name: string = getElementTagName(node);
  if (name === TAG_NAME) {
    const attributes: IMappedAttributes = extractRXAttributesFromReactiveHTMLAttribute(
      node.attributes,
      ATTRIBUTE_NAMES,
    );
    const slotName: string | undefined = attributes.get(SLOT_NAME_ATTRIBUTE_NAME);

    if (slotName === void 0) {
      throw new Error(`Missing attribute '${SLOT_NAME_ATTRIBUTE_NAME}'`);
    }

    const defaultLines: ILinesOrNull = transpileReactiveHTMLNodesToJSLines({
      ...options,
      nodes: node.childNodes,
    });

    return generateJSLinesForRXInjectSlot({
      slotName,
      defaultLines,
    });
  } else if (node.hasAttribute(COMMAND_NAME)) {
    const slotName: string = node.getAttribute(COMMAND_NAME) as string;
    node.removeAttribute(COMMAND_NAME);

    const element = document.createElement(TAG_NAME);
    element.setAttribute(SLOT_NAME_ATTRIBUTE_NAME, slotName);
    while (node.firstChild !== null) {
      element.appendChild(node.firstChild);
    }

    node.appendChild(element);

    return transpileReactiveHTMLElementToJSLines({
      ...options,
      node,
    });
  } else {
    return null;
  }
}



// export function transpileReactiveHTMLRXInjectSlotToLines(
//   {
//     node,
//     ...options
//   }: ITranspileReactiveHTMLRXInjectSlotToLinesOptions,
// ): ILinesOrNull {
//   const name: string = getElementTagName(node);
//   if (name === TAG_NAME) {
//     const attributes: IMappedAttributes = extractRXAttributesFromReactiveHTMLAttribute(
//       node.attributes,
//       ATTRIBUTE_NAMES,
//     );
//     const slotName: string | undefined = attributes.get(SLOT_NAME_ATTRIBUTE_NAME);
//
//     if (slotName === void 0) {
//       throw new Error(`Missing attribute '${SLOT_NAME_ATTRIBUTE_NAME}'`);
//     }
//
//     const defaultLines: ILinesOrNull = transpileReactiveHTMLNodesToJSLines({
//       ...options,
//       nodes: node.childNodes,
//     });
//
//     return generateJSLinesForRXInjectSlot({
//       slotName,
//       defaultLines,
//     });
//   } else if (node.hasAttribute(COMMAND_NAME)) {
//     const slotName: string = node.getAttribute(COMMAND_NAME) as string;
//     node.removeAttribute(COMMAND_NAME);
//
//     // const defaultLines: ILinesOrNull = transpileReactiveHTMLElementToJSLines({
//     //   ...options,
//     //   node,
//     // });
//
//     const defaultLines: ILinesOrNull = transpileReactiveHTMLNodesToJSLines({
//       ...options,
//       nodes: node.childNodes,
//     });
//
//     return generateJSLinesForRXInjectSlot({
//       slotName,
//       defaultLines,
//     });
//   } else {
//     return null;
//   }
// }

