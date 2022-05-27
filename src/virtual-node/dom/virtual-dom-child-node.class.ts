import { VirtualDOMNode } from './virtual-dom-node.class';

export abstract class VirtualDOMChildNode extends VirtualDOMNode {
  protected constructor() {
    super({
      isRoot: false,
      isLeaf: true,
    });
  }

  override getParentDOMNode(): never {
    throw new Error(`Cannot be used as parent`);
  }
}
