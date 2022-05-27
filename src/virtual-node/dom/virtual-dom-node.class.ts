import { VirtualNode } from '../virtual-node.class';

export type IVirtualDOMNodeOrNull = VirtualDOMNode | null;

export abstract class VirtualDOMNode extends VirtualNode {
  override attach(
    parentNode: VirtualDOMNode,
    referenceNode: IVirtualDOMNodeOrNull = null,
  ): boolean {
    const attached: boolean = super.attach(
      parentNode,
      referenceNode,
    );

    if (attached) {
      const parentDOMNode: ParentNode | null = parentNode.getParentDOMNode();

      if (parentDOMNode !== null) {
        const selfDOMNodes: readonly Node[] = this.getSelfDOMNodes();
        const referenceDOMNode: Node | null = (referenceNode === null)
          ? null
          : referenceNode.getReferenceDOMNode();

        const length: number = selfDOMNodes.length;
        if (length > 1e2) { // TODO pimp limit for optimizations
          const fragment: DocumentFragment = document.createDocumentFragment();
          for (let i = 0; i < length; i++) {
            fragment.insertBefore(selfDOMNodes[i], referenceDOMNode);
          }
          parentDOMNode.insertBefore(fragment, referenceDOMNode);
        } else {
          for (let i = 0; i < length; i++) {
            parentDOMNode.insertBefore(selfDOMNodes[i], referenceDOMNode);
          }
        }
      }
    }

    return attached;
  }

  override detach(): boolean {
    const detached: boolean = super.detach();

    if (detached) {
      const selfDOMNodes: readonly ChildNode[] = this.getSelfDOMNodes() as readonly ChildNode[];
      for (let i = 0, length = selfDOMNodes.length; i < length; i++) {
        selfDOMNodes[i].remove();
      }
    }

    return detached;
  }

  abstract getSelfDOMNodes(): readonly Node[];

  abstract getParentDOMNode(): ParentNode | null;

  abstract getReferenceDOMNode(): Node | null;

}
