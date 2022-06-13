import { IObserver } from '@lirx/core';
import { createVirtualDOMNodeModifier, VirtualDOMNode } from '@lirx/dom';

export function nodeReferenceModifierFunction(
  node: VirtualDOMNode,
  $destination: IObserver<VirtualDOMNode>,
): VirtualDOMNode {
  $destination(node);
  return node;
}


export const NODE_REFERENCE_MODIFIER = createVirtualDOMNodeModifier('ref', nodeReferenceModifierFunction);


