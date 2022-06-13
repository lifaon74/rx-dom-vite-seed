import { $$map, ISource } from '@lirx/core';
import { createVirtualDOMNodeModifier, VirtualDOMNode, VirtualReactiveElementNode } from '@lirx/dom';

export function inputValueModifierFunction(
  node: VirtualDOMNode,
  {
    emit,
    subscribe,
  }: ISource<string>,
): VirtualDOMNode {
  if (
    (node instanceof VirtualReactiveElementNode)
    && (node.elementNode instanceof HTMLInputElement)
  ) {
    node.on$('input')($$map(emit, () => node.elementNode.value));
    node.setReactiveProperty('value', subscribe);
    return node;
  } else {
    throw new Error(`Not an input element`);
  }
}

export const INPUT_VALUE_MODIFIER = createVirtualDOMNodeModifier('input-value', inputValueModifierFunction);


