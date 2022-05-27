import {
  IVirtualCustomElementNodeSlotsMap,
} from '../../virtual-node/dom/nodes/reactive/custom-element/slots/virtual-custom-element-node-slots-map.type';
import {
  IGenericGenericVirtualCustomElementNode,
  IVirtualCustomElementNodeConfig,
  IVirtualCustomElementNodeOptions,
  VirtualCustomElementNode,
} from '../../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';
import { VirtualContainerNode } from '../../virtual-node/dom/nodes/static/container/virtual-container-node.class';
import { VirtualDOMNode } from '../../virtual-node/dom/virtual-dom-node.class';
import { IComponent, IComponentCreateFunction } from '../types/component.type';

/*------------*/

export interface IComponentConfig extends IVirtualCustomElementNodeConfig {
  data?: object;
}

/*------------*/

export type InferComponentConfigData<GConfig extends IComponentConfig> =
  GConfig['data'] extends object
    ? GConfig['data']
    : object;

/*------------*/

// export interface IComponentInitFunctionOptions<GConfig extends IComponentConfig> {
//   node: VirtualCustomElementNode<GConfig>;
//   slots: IVirtualCustomElementNodeSlotsMap;
//   // inputs: ITypedSourcesMap<GTypedSourcesTuple>;
//   // outputs: ITypedSourcesMap<GTypedSourcesTuple>;
// }

export type InferComponentInitFunctionReturn<GData extends (object | undefined)> =
  GData extends object
    ? GData
    : (GData | undefined | void)
  ;

export interface IComponentInitFunction<GConfig extends IComponentConfig> {
  (
    node: VirtualCustomElementNode<GConfig>,
    // options: IComponentInitFunctionOptions<GConfig>,
  ): InferComponentInitFunctionReturn<GConfig['data']>;
}

export type PartialInterfaceIfDataIsUndefined<GData extends (object | undefined), GInterface> =
  GData extends object
    ? GInterface
    : Partial<GInterface>
  ;

export type InferComponentInitInterface<GConfig extends IComponentConfig> =
  PartialInterfaceIfDataIsUndefined<GConfig['data'], {
    init: IComponentInitFunction<GConfig>;
  }>;

export interface IComponentTemplate<GData extends object> {
  (
    parentNode: VirtualDOMNode,
    $: GData,
    slots: IVirtualCustomElementNodeSlotsMap,
  ): void;
}

export interface IComponentStyle {
  (
    node: IGenericGenericVirtualCustomElementNode,
  ): void;
}

export type ICreateComponentOptions<GConfig extends IComponentConfig> = {
    template?: IComponentTemplate<InferComponentConfigData<GConfig>>;
    styles?: readonly IComponentStyle[];
  }
  & Pick<IVirtualCustomElementNodeOptions<GConfig>, 'name' | 'extends' | 'inputs' | 'outputs'>
  & InferComponentInitInterface<GConfig>
  ;

// export interface ICreateComponentOptions<GConfig extends IComponentConfig> extends Pick<IVirtualCustomElementNodeOptions<GConfig>, 'name' | 'extends' | 'inputs' | 'outputs'> {
//
//   // inputs: ITypedSourcesMapEntriesTupleToEntriesTuple<GTypedSourcesTuple>;
//   // outputs: ITypedSourcesMapEntriesTupleToEntriesTuple<GTypedSourcesTuple>;
//
//   init: IComponentInitFunction<GConfig>;
//
//   template?: IComponentTemplate<GData>;
//   styles?: readonly IComponentStyle[];
// }

export function createComponent<GConfig extends IComponentConfig>(
  {
    name,
    extends: _extends,
    inputs,
    outputs,
    init,
    template,
    styles = [],
  }: ICreateComponentOptions<GConfig>,
): IComponent<GConfig> {

  const create: IComponentCreateFunction<GConfig> = (
    slots: IVirtualCustomElementNodeSlotsMap = new Map(),
  ): VirtualCustomElementNode<GConfig> => {

    const node = new VirtualCustomElementNode<GConfig>({
      name,
      extends: _extends,
      slots,
      inputs,
      outputs,
    } as IVirtualCustomElementNodeOptions<GConfig>);

    const $: InferComponentConfigData<GConfig> = (init === void 0)
      ? {}
      : (
        init(node) ?? {}
      ) as InferComponentConfigData<GConfig>;

    if (template !== void 0) {
      if (node.isConnected) { // batch append child nodes to increase performances
        const container: VirtualContainerNode = new VirtualContainerNode();
        template(container, $, slots);
        container.attach(node);
      } else {
        template(node, $, slots);
      }
    }

    for (let i = 0, l = styles.length; i < l; i++) {
      styles[i](node);
    }

    return node;
  };

  return {
    name,
    create,
  };
}

/*---------------*/

// interface ConfigA {
//   element: HTMLButtonElement;
//   inputs: [
//     ['i-a', boolean],
//   ],
//   outputs: [
//     ['o-a', number],
//   ],
//   // data: {
//   //   dataA: string;
//   // };
// }
//
// const a = createComponent<ConfigA>({
//   name: 'test',
//   inputs: [
//     ['i-a', true],
//   ],
//   outputs: [
//     'o-a',
//   ],
//   init: (): any => {
//
//   },
// });
