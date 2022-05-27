import { ITypedSourcesMapEntriesTuple } from '../../misc/typed-sources-map/types/typed-sources-map-entries-tuple.type';
import {
  IVirtualCustomElementNodeSlotsMap,
} from '../../virtual-node/dom/nodes/reactive/custom-element/slots/virtual-custom-element-node-slots-map.type';
import { VirtualCustomElementNode } from '../../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';
import { IComponent } from '../types/component.type';

export function createComponentReference<// generics
  GElement extends HTMLElement,
  GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple,
  //
  >(
  name: string,
  getComponent: () => IComponent<GElement, GTypedSourcesTuple>,
): IComponent<GElement, GTypedSourcesTuple> {
  return {
    name,
    create: (
      slots?: IVirtualCustomElementNodeSlotsMap,
    ): VirtualCustomElementNode<GElement, GTypedSourcesTuple> => {
      const { name: _name, create } = getComponent();
      if (_name === name) {
        return create(slots);
      } else {
        throw new Error(`Names mismatch`);
      }
    },
  };
}
