import { VirtualDOMNode } from '../virtual-dom-node.class';

export interface IVirtualDOMNodeTemplate<GArguments extends any[]> {
  (
    parentNode: VirtualDOMNode,
    ...args: GArguments
  ): void;
}

