import { IGenericVirtualReactiveElementNode, VirtualReactiveElementNode } from '@lirx/dom';

export type IInputVirtualReactiveElementNode = VirtualReactiveElementNode<HTMLInputElement>;

export function isInputVirtualReactiveElementNode(
  node: IGenericVirtualReactiveElementNode,
): node is IInputVirtualReactiveElementNode {
  return node.elementNode instanceof HTMLInputElement;
}
