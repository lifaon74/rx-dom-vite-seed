import {
  IVirtualCustomElementNodeSlotsMap,
} from '../../virtual-node/dom/nodes/reactive/custom-element/slots/virtual-custom-element-node-slots-map.type';
import {
  IVirtualCustomElementNodeConfig,
  VirtualCustomElementNode,
} from '../../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';


export interface IComponentCreateFunction<GConfig extends IVirtualCustomElementNodeConfig> {
  (
    slots?: IVirtualCustomElementNodeSlotsMap,
  ): VirtualCustomElementNode<GConfig>;
}

export interface IComponent<GConfig extends IVirtualCustomElementNodeConfig> {
  readonly name: string;
  readonly create: IComponentCreateFunction<GConfig>;
}

// export type IGenericComponent = IComponent<IVirtualCustomElementNodeConfig>;
export type IGenericComponent = IComponent<any>;

