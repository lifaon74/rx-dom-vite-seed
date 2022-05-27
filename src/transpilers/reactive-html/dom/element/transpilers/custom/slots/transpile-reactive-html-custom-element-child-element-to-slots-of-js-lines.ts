import { getElementTagName } from '../../../../../../../misc/dom/get-element-tag-name';
import { createMissingAttributeError } from '../../../../../../misc/errors/create-missing-attribute-error';
import { createSlotAlreadyExistsError } from '../../../../../../misc/errors/create-slot-already-exists-error';
import { linesOrNullToLines } from '../../../../../../misc/lines/functions/lines-or-null-to-lines';
import { ILinesOrNull } from '../../../../../../misc/lines/lines-or-null.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../../primary/primary-transpilers.type';
import {
  ITranspileCreateReactiveCustomElementNodeToJSLinesOptionsSlotsMap,
} from '../../../../../primary/transpilers/transpile-create-reactive-custom-element-node-to-js-lines.type';
import { transpileReactiveHTMLNodesToJSLines } from '../../../../nodes/transpile-reactive-html-nodes-to-js-lines';
import { transpileReactiveHTMLElementToJSLines } from '../../../transpile-reactive-html-element-to-js-lines';

export const RX_SLOT_TAG_NAME = 'rx-slot';
export const RX_SLOT_COMMAND = '*slot';

export interface ITranspileReactiveHTMLCustomElementChildElementToSlotsOfJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
  slots: ITranspileCreateReactiveCustomElementNodeToJSLinesOptionsSlotsMap;
}

export function transpileReactiveHTMLCustomElementChildElementToSlotsOfJSLines(
  {
    node,
    slots,
    ...options
  }: ITranspileReactiveHTMLCustomElementChildElementToSlotsOfJSLinesOptions,
): void {
  if (getElementTagName(node) === RX_SLOT_TAG_NAME) {
    const name: string | null = node.getAttribute('name');
    if (name === null) {
      throw createMissingAttributeError('name', RX_SLOT_TAG_NAME);
    } else if (slots.has(name)) {
      throw createSlotAlreadyExistsError(name);
    } else {
      slots.set(name, linesOrNullToLines(transpileReactiveHTMLNodesToJSLines({
        ...options,
        nodes: node.childNodes,
      })));
    }
  } else {
    let name: string | null = node.getAttribute(RX_SLOT_COMMAND);
    if (name === null) {
      const lines: ILinesOrNull = transpileReactiveHTMLElementToJSLines({
        ...options,
        node: node as Element,
      });
      if (lines !== null) {
        slots.get('*')!.push(...lines);
      }
    } else if (slots.has(name)) {
      throw createSlotAlreadyExistsError(name);
    } else {
      node.removeAttribute(RX_SLOT_COMMAND);
      slots.set(name, linesOrNullToLines(transpileReactiveHTMLElementToJSLines({
        ...options,
        node: node as Element,
      })));
    }
  }
}
