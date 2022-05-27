import { IVirtualDOMNodeOrNull, VirtualDOMNode } from '../../../virtual-dom-node.class';

export class VirtualContainerNode extends VirtualDOMNode {

  constructor() {
    super({
      isRoot: false,
      isLeaf: false,
    });
  }

  override getSelfDOMNodes(): readonly Node[] {
    return Array.from(this.getChildren() as Iterable<VirtualDOMNode>)
      .flatMap((child: VirtualDOMNode): readonly Node[] => {
        return child.getSelfDOMNodes();
      });
  }

  override getParentDOMNode(): ParentNode | null {
    const parentNode: IVirtualDOMNodeOrNull = this.parentNode as IVirtualDOMNodeOrNull;
    return (parentNode === null)
      ? null
      : parentNode.getParentDOMNode();
  }

  override getReferenceDOMNode(): Node | null {
    const firstChildResult: IteratorResult<VirtualDOMNode> = (this.getChildren() as Iterable<VirtualDOMNode>)[Symbol.iterator]().next();
    if (firstChildResult.done) {
      const getNextReferenceNode = (
        node: VirtualDOMNode,
      ): Node | null => {
        const nextNode: IVirtualDOMNodeOrNull = node.nextNode as IVirtualDOMNodeOrNull;
        if (nextNode === null) {
          const parentNode: IVirtualDOMNodeOrNull = node.parentNode as IVirtualDOMNodeOrNull;
          if (parentNode === null) {
            return null;
            // throw new Error(`Cannot getReferenceDOMNode from an isolated VirtualContainerNode`);
          } else {
            return getNextReferenceNode(parentNode);
          }
        } else {
          return nextNode.getReferenceDOMNode();
        }
      };
      return getNextReferenceNode(this);
    } else {
      return firstChildResult.value.getReferenceDOMNode();
    }
  }
}

