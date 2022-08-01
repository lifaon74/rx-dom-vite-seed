import { IObserver } from '@lirx/core';
import { createVirtualDOMNodeModifier, VirtualDOMNode, VirtualReactiveElementNode } from '@lirx/dom';

export function nodeReferenceModifierFunction(
  node: VirtualDOMNode,
  $destination: IObserver<VirtualDOMNode>,
): VirtualDOMNode {
  $destination(node);
  return node;
}


export const NODE_REFERENCE_MODIFIER = createVirtualDOMNodeModifier('ref', nodeReferenceModifierFunction);


/*--------*/

export function elementReferenceModifierFunction<GElementNode extends Element>(
  node: VirtualDOMNode,
  $destination: IObserver<GElementNode>,
): VirtualDOMNode {
  if (node instanceof VirtualReactiveElementNode) {
    $destination(node.elementNode);
    return node;
  } else {
    throw new Error(`Not a VirtualReactiveElementNode`);
  }
}


export const ELEMENT_REFERENCE_MODIFIER = createVirtualDOMNodeModifier<IObserver<Element>, VirtualDOMNode>('element-reference', elementReferenceModifierFunction);


