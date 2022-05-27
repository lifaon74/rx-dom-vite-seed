import { VirtualDOMNode } from '../../../virtual-dom-node.class';

export class VirtualRootNode<GRootNode extends ParentNode> extends VirtualDOMNode {
  public readonly rootNode: GRootNode;

  constructor(
    rootNode: GRootNode,
  ) {
    super({
      isRoot: true,
      isLeaf: false,
    });
    this.rootNode = rootNode;
  }

  override getSelfDOMNodes(): readonly Node[] {
    return [
      this.rootNode,
    ];
  }

  override getParentDOMNode(): ParentNode {
    return this.rootNode;
  }

  override getReferenceDOMNode(): Node {
    return this.rootNode;
  }
}


