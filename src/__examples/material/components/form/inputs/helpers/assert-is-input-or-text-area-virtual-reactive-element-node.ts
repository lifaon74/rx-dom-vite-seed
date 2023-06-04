import { IGenericVirtualReactiveElementNode } from '@lirx/dom';
import {
  IInputOrTextAreaVirtualReactiveElementNode,
  isInputOrTextAreaVirtualReactiveElementNode,
} from './is-input-or-text-area-virtual-reactive-element-node';

export function assertIsInputOrTextAreaVirtualReactiveElementNode(
  node: IGenericVirtualReactiveElementNode,
): asserts node is IInputOrTextAreaVirtualReactiveElementNode {
  if (!isInputOrTextAreaVirtualReactiveElementNode(node)) {
    throw new Error(`Not an <input> or <textarea>`);
  }
}
