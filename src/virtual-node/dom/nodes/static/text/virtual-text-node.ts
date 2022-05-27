import { VirtualDOMChildNode } from '../../../virtual-dom-child-node.class';

export class VirtualTextNode extends VirtualDOMChildNode {
  protected readonly textNode: Text;

  constructor(
    value?: string,
  ) {
    super();
    this.textNode = new Text(value);
  }

  get value(): string {
    return this.textNode.data;
  }

  set value(
    input: string,
  ) {
    this.textNode.data = input;
  }

  override getSelfDOMNodes(): readonly Node[] {
    return [
      this.textNode,
    ];
  }

  override getReferenceDOMNode(): Node {
    return this.textNode;
  }
}

// export class VirtualTextNode extends VirtualDOMChildNode {
//   protected readonly textNode: Text;
//   protected readonly selfDOMNodes: [Text];
//
//   constructor(
//     value?: string,
//   ) {
//     super();
//     this.textNode = new Text(value);
//     this.selfDOMNodes = [
//       this.textNode,
//     ];
//   }
//
//   get value(): string {
//     return this.textNode.data;
//   }
//
//   set value(
//     input: string,
//   ) {
//     this.textNode.data = input;
//   }
//
//   override getSelfDOMNodes(): readonly Node[] {
//     return this.selfDOMNodes;
//   }
//
//   override getReferenceDOMNode(): Node {
//     return this.textNode;
//   }
// }
