import { isElementNode } from '../../../misc/dom/is/is-element-node';
import { VirtualDOMNode } from '../virtual-dom-node.class';

export type IVirtualDOMNodeQuerySelectorAllResult<GElement extends HTMLElement> = [
  node: VirtualDOMNode,
  domNode: GElement,
];

/**
 * WARN: this function lacks of accuracy
 */
export function* virtualDDOMNodeQuerySelectorAll<GElement extends HTMLElement>(
  node: VirtualDOMNode,
  selector: string,
): Generator<IVirtualDOMNodeQuerySelectorAllResult<GElement>> {

  const hasScope: boolean = selector.includes(':scope');
  let selfDOMNodes!: readonly Node[];
  let id!: string;

  if (hasScope) {
    selfDOMNodes = node.getSelfDOMNodes();
    id = `scope-${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)}`;
    selfDOMNodes.forEach((node: Node) => {
      if (isElementNode(node)) {
        node.setAttribute(id, '');
      } else {
        throw new Error(`cannot patch :scope on a non Element node`);
      }
    });
    selector = selector.replace(':scope', `[${id}]`);
  }

  const iterator: Iterator<VirtualDOMNode> = node.getChildrenRecursive() as Iterator<VirtualDOMNode>;
  let result: IteratorResult<VirtualDOMNode>;
  while (!(result = iterator.next()).done) {
    const childNode: VirtualDOMNode = result.value;
    // WARN: if we encounter a VirtualContainer, we will encounter duplicates childDOMNode
    const childDOMNodes: readonly Node[] = childNode.getSelfDOMNodes();

    for (let i = 0, l = childDOMNodes.length; i < l; i++) {
      const childDOMNode: Node = childDOMNodes[i];
      if (isElementNode(childDOMNode)) {
        if (childDOMNode.matches(selector)) {
          yield [childNode, childDOMNode as GElement];
        }
      }
    }
  }

  if (hasScope) {
    (selfDOMNodes as readonly Element[]).forEach((node: Element): void => {
      node.removeAttribute(id);
    });
  }
}

// * querySelector(
//   selector: string,
// ): Generator<VirtualDOMNode> {
//   let parentDOMNode: ParentNode | null = this.getParentDOMNode();
//   let id: string | undefined;
//
//   if (selector.includes(':scope')) {
//     if ((parentDOMNode === null) || ()) {
//       return;
//     } else {
//       id = `scope-${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)}`;
//       selector = selector.replace(':scope', `[${id}]`);
//     }
//   }
//
//
//   const iterator: Iterator<VirtualDOMNode> = this.getChildrenRecursive() as Iterator<VirtualDOMNode>;
//   let result: IteratorResult<VirtualDOMNode>;
//   while (!(result = iterator.next()).done) {
//     const childNode: VirtualDOMNode = result.value;
//     const childDOMNodes: readonly Node[] = childNode.getSelfDOMNodes();
//
//     for (let i = 0, l = childDOMNodes.length; i < l; i++) {
//       const childDOMNode: Node = childDOMNodes[i];
//       if (isElementNode(childDOMNode)) {
//         childDOMNode.matches(selector);
//       }
//     }
//   }
// }
