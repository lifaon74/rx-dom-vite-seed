import { indentLines } from '../../../../../../misc/lines/functions/indent-lines';
import { ILines } from '../../../../../../misc/lines/lines.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../../primary/primary-transpilers.type';
import {
  ITranspileCreateReactiveCustomElementNodeToJSLinesOptionsSlotsMap,
} from '../../../../../primary/transpilers/transpile-create-reactive-custom-element-node-to-js-lines.type';
import {
  transpileReactiveHTMLCustomElementChildElementToSlotsOfJSLines,
} from './transpile-reactive-html-custom-element-child-element-to-slots-of-js-lines';
import {
  transpileReactiveHTMLCustomElementChildTextToSlotsOfJSLines,
} from './transpile-reactive-html-custom-element-child-text-to-slots-of-js-lines';

export interface ITranspileReactiveHTMLCustomElementChildrenToSlotsOfJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  nodes: ArrayLike<Node>;
}

export function transpileReactiveHTMLCustomElementChildrenToSlotsOfJSLines(
  {
    nodes,
    transpilers,
  }: ITranspileReactiveHTMLCustomElementChildrenToSlotsOfJSLinesOptions,
): ITranspileCreateReactiveCustomElementNodeToJSLinesOptionsSlotsMap {
  const slots: ITranspileCreateReactiveCustomElementNodeToJSLinesOptionsSlotsMap = new Map<string, ILines>([['*', []]]);

  for (let i = 0; i < nodes.length; i++) {
    const node: Node = nodes[i];
    switch (node.nodeType) {
      case Node.TEXT_NODE:
        transpileReactiveHTMLCustomElementChildTextToSlotsOfJSLines({
          node: node as Text,
          slots,
          transpilers,
        });
        break;
      case Node.COMMENT_NODE:
        break;
      case Node.ELEMENT_NODE:
        transpileReactiveHTMLCustomElementChildElementToSlotsOfJSLines({
          node: node as Element,
          slots,
          transpilers,
        });
        break;
      default:
        break;
    }
  }

  Array.from(slots.entries()).forEach(([slotName, slotLines]: [string, ILines]) => {
    if (slotLines.length === 0) {
      slots.delete(slotName);
    } else {
      slots.set(slotName, [
        `(parentNode) => {`,
        ...indentLines(slotLines),
        `}`,
      ]);
    }
  });

  return slots;
}


