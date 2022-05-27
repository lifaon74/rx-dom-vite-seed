import { isElementNode } from '../../../misc/dom/is/is-element-node';
import { VirtualDOMNode } from '../virtual-dom-node.class';

export function virtualDOMNodeQuerySelector<GElement extends HTMLElement>(
  node: VirtualDOMNode,
  selector: string,
): GElement | null {
  const selfDOMNodes: readonly Node[] = node.getSelfDOMNodes();
  for (let i = 0, l = selfDOMNodes.length; i < l; i++) {
    const selfDOMNode: Node = selfDOMNodes[i];
    if (isElementNode(selfDOMNode)) {
      const selectedDOMNode: GElement | null = selfDOMNode.querySelector<GElement>(selector);
      if (selectedDOMNode !== null) {
        return selectedDOMNode;
      }
    }
  }
  return null;
}

export function virtualDOMNodeQuerySelectorOrThrow<GElement extends HTMLElement>(
  node: VirtualDOMNode,
  selector: string,
): GElement {
  const selectedDOMNode: GElement | null = virtualDOMNodeQuerySelector<GElement>(node, selector);
  if (selectedDOMNode === null) {
    throw new Error(`Failed to select element`);
  } else {
    return selectedDOMNode;
  }
}
