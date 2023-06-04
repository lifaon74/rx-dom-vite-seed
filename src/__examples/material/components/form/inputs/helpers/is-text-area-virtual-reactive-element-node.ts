import { IGenericVirtualReactiveElementNode, VirtualReactiveElementNode } from '@lirx/dom';

export type ITextAreaVirtualReactiveElementNode = VirtualReactiveElementNode<HTMLTextAreaElement>;

export function isTextAreaVirtualReactiveElementNode(
  node: IGenericVirtualReactiveElementNode,
): node is ITextAreaVirtualReactiveElementNode {
  return node.elementNode instanceof HTMLTextAreaElement;
}


