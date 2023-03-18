import { VirtualReactiveElementNode } from '@lirx/dom';

/**
 * TODO export into @lirx/dom
 */

export type IElementOrVirtualReactiveElementNode<GElementNode extends Element> =
  | GElementNode
  | VirtualReactiveElementNode<GElementNode>
  ;

export function elementOrVirtualReactiveElementNodeToElement<GElementNode extends Element>(
  input: IElementOrVirtualReactiveElementNode<GElementNode>,
): GElementNode {
  return (input instanceof Element)
    ? input
    : input.elementNode;
}

