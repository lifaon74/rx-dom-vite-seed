import { ITypedSourcesMapEntriesTuple } from '../misc/typed-sources-map/types/typed-sources-map-entries-tuple.type';
import {
  IVirtualCustomElementNodeSlotsMap
} from '../virtual-node/dom/nodes/reactive/custom-element/slots/virtual-custom-element-node-slots-map.type';
import { VirtualCustomElementNode } from '../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';
import { BODY_ROOT } from '../virtual-node/dom/nodes/static/root/virtual-root-node-body.constant';
import { IComponent } from './types/component.type';

export function bootstrap<// generics
  GElement extends HTMLElement,
  GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple,
//
  >(
  component: IComponent<GElement, GTypedSourcesTuple>,
  slots?: IVirtualCustomElementNodeSlotsMap,
): VirtualCustomElementNode<GElement, GTypedSourcesTuple> {
  const elementNode: VirtualCustomElementNode<GElement, GTypedSourcesTuple> = component.create(slots);
  elementNode.attach(BODY_ROOT);
  return elementNode
}
