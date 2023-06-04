import { IGenericVirtualReactiveElementNode, VirtualReactiveElementNode } from '@lirx/dom';
import { isInputVirtualReactiveElementNode } from './is-input-virtual-reactive-element-node';
import { isTextAreaVirtualReactiveElementNode } from './is-text-area-virtual-reactive-element-node';

// export type IInputOrTextAreaVirtualReactiveElementNode =
//   | IInputVirtualReactiveElementNode
//   | ITextAreaVirtualReactiveElementNode
//   ;

export type IInputOrTextAreaVirtualReactiveElementNode = VirtualReactiveElementNode<HTMLInputElement | HTMLTextAreaElement>;

export function isInputOrTextAreaVirtualReactiveElementNode(
  node: IGenericVirtualReactiveElementNode,
): node is IInputOrTextAreaVirtualReactiveElementNode {
  return isInputVirtualReactiveElementNode(node)
    || isTextAreaVirtualReactiveElementNode(node);
}

