import { IObservable, IObserver, single } from '@lirx/core';
import { HTML_NAMESPACE_URI_CONSTANT } from '../../../../../misc/namespace-uri/html-namespace-uri.constant';
import { createTypedSourcesMap } from '../../../../../misc/typed-sources-map/implementations/create-typed-sources-map';
import { ITypedSourcesMap } from '../../../../../misc/typed-sources-map/implementations/typed-sources-map';
import {
  InferTypedSourcesMapEntriesTupleKeys,
} from '../../../../../misc/typed-sources-map/types/infer-typed-sources-map-entries-tuple-keys.infer';
import {
  InferTypedSourcesMapEntriesTupleValueFromKey,
} from '../../../../../misc/typed-sources-map/types/infer-typed-sources-map-entries-tuple-value-from-key.infer';
import {
  ITypedSourcesMapEntriesTupleToEntriesTuple,
} from '../../../../../misc/typed-sources-map/types/typed-sources-map-entries-tuple-to-entries-tuple.infer';
import {
  ITypedSourcesMapEntriesTupleToKeysTuple,
} from '../../../../../misc/typed-sources-map/types/typed-sources-map-entries-tuple-to-keys-tuple.infer';
import { ITypedSourcesMapEntriesTuple } from '../../../../../misc/typed-sources-map/types/typed-sources-map-entries-tuple.type';
import { VirtualReactiveElementNode } from '../element/virtual-reactive-element-node.class';
import { IVirtualCustomElementNodeSlotsMap } from './slots/virtual-custom-element-node-slots-map.type';

/*------------*/

export interface IVirtualCustomElementNodeConfig {
  element?: HTMLElement;
  inputs?: ITypedSourcesMapEntriesTuple;
  outputs?: ITypedSourcesMapEntriesTuple;
}

/*------------*/

export type InferVirtualCustomElementNodeConfigElement<GConfig extends IVirtualCustomElementNodeConfig> =
  GConfig['element'] extends HTMLElement
    ? GConfig['element']
    : HTMLElement;

export type InferVirtualCustomElementNodeConfigInputs<GConfig extends IVirtualCustomElementNodeConfig> =
  GConfig['inputs'] extends ITypedSourcesMapEntriesTuple
    ? GConfig['inputs']
    : [];

export type InferVirtualCustomElementNodeConfigOutputs<GConfig extends IVirtualCustomElementNodeConfig> =
  GConfig['outputs'] extends ITypedSourcesMapEntriesTuple
    ? GConfig['outputs']
    : [];

/*------------*/

export type InferVirtualCustomElementNodeOptionsInputs<GConfig extends IVirtualCustomElementNodeConfig> =
  ITypedSourcesMapEntriesTupleToEntriesTuple<InferVirtualCustomElementNodeConfigInputs<GConfig>>;

export type InferVirtualCustomElementNodeOptionsOutputs<GConfig extends IVirtualCustomElementNodeConfig> =
  ITypedSourcesMapEntriesTupleToKeysTuple<InferVirtualCustomElementNodeConfigOutputs<GConfig>>;

/*------------*/

export type InferVirtualCustomElementNodeSetReactiveInputKeys<GConfig extends IVirtualCustomElementNodeConfig> =
  InferTypedSourcesMapEntriesTupleKeys<InferVirtualCustomElementNodeConfigInputs<GConfig>>
  ;

export type InferVirtualCustomElementNodeSetReactiveInputValueFromKey<// generics
  GConfig extends IVirtualCustomElementNodeConfig,
  GKey extends InferVirtualCustomElementNodeSetReactiveInputKeys<GConfig>
  //
  > =
  InferTypedSourcesMapEntriesTupleValueFromKey<InferVirtualCustomElementNodeConfigInputs<GConfig>, GKey>
  ;

export type InferVirtualCustomElementNodeSetReactiveOutputKeys<GConfig extends IVirtualCustomElementNodeConfig> =
  | InferTypedSourcesMapEntriesTupleKeys<InferVirtualCustomElementNodeConfigInputs<GConfig>>
  | InferTypedSourcesMapEntriesTupleKeys<InferVirtualCustomElementNodeConfigOutputs<GConfig>>
  ;

export type InferVirtualCustomElementNodeSetReactiveOutputValueFromKey<// generics
  GConfig extends IVirtualCustomElementNodeConfig,
  GKey extends InferVirtualCustomElementNodeSetReactiveInputKeys<GConfig>
  //
  > =
  GKey extends InferTypedSourcesMapEntriesTupleKeys<InferVirtualCustomElementNodeConfigInputs<GConfig>>
    ? InferTypedSourcesMapEntriesTupleValueFromKey<InferVirtualCustomElementNodeConfigInputs<GConfig>, GKey>
    : InferTypedSourcesMapEntriesTupleValueFromKey<InferVirtualCustomElementNodeConfigOutputs<GConfig>, GKey>
  ;

export type PartialInterfaceIfTypedSourcesTupleIsEmpty<GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple, GInterface> =
  GTypedSourcesTuple extends []
    ? Partial<GInterface>
    : GInterface
  ;

/*------------*/

export type InferVirtualCustomElementNodeOptionsInputsInterface<GConfig extends IVirtualCustomElementNodeConfig> =
  PartialInterfaceIfTypedSourcesTupleIsEmpty<InferVirtualCustomElementNodeConfigInputs<GConfig>, { inputs: InferVirtualCustomElementNodeOptionsInputs<GConfig> }>
  ;

export type InferVirtualCustomElementNodeOptionsOutputsInterface<GConfig extends IVirtualCustomElementNodeConfig> =
  PartialInterfaceIfTypedSourcesTupleIsEmpty<InferVirtualCustomElementNodeConfigOutputs<GConfig>, { outputs: InferVirtualCustomElementNodeOptionsOutputs<GConfig> }>
  ;

export type IVirtualCustomElementNodeOptions<GConfig extends IVirtualCustomElementNodeConfig> = {
    name: string;
    extends?: string;
    slots: IVirtualCustomElementNodeSlotsMap;
  }
  & InferVirtualCustomElementNodeOptionsInputsInterface<GConfig>
  & InferVirtualCustomElementNodeOptionsOutputsInterface<GConfig>
  ;

// export interface IVirtualCustomElementNodeOptions<GConfig extends IVirtualCustomElementNodeConfig> {
//   name: string;
//   extends?: string;
//   slots: IVirtualCustomElementNodeSlotsMap;
//   inputs?: InferVirtualCustomElementNodeOptionsInputs<GConfig>;
//   outputs?: InferVirtualCustomElementNodeOptionsOutputs<GConfig>;
// }

export class VirtualCustomElementNode<GConfig extends IVirtualCustomElementNodeConfig> extends VirtualReactiveElementNode<InferVirtualCustomElementNodeConfigElement<GConfig>> {

  protected readonly _name: string;
  protected readonly _extends: string | undefined;
  protected readonly _slots: IVirtualCustomElementNodeSlotsMap;
  protected readonly _inputs: ITypedSourcesMap<InferVirtualCustomElementNodeConfigInputs<GConfig>>;
  protected readonly _outputs: ITypedSourcesMap<InferVirtualCustomElementNodeConfigOutputs<GConfig>>;

  constructor(
    {
      name,
      extends: _extends,
      slots,
      inputs = [] as unknown as InferVirtualCustomElementNodeOptionsInputs<GConfig>,
      outputs = [] as unknown as InferVirtualCustomElementNodeOptionsOutputs<GConfig>,
    }: IVirtualCustomElementNodeOptions<GConfig>,
  ) {
    super(
      HTML_NAMESPACE_URI_CONSTANT,
      (_extends === void 0)
        ? name
        : _extends,
    );
    this._name = name;
    this._extends = _extends;
    this._slots = slots;

    verifyInterfacesIntegrity(
      inputs,
      outputs,
    );

    this._inputs = createTypedSourcesMap<InferVirtualCustomElementNodeConfigInputs<GConfig>>(inputs);
    this._outputs = createTypedSourcesMap<InferVirtualCustomElementNodeConfigOutputs<GConfig>>(
      (outputs as unknown as string[]).map((name: string): [string] => {
        return [name];
      }) as unknown as ITypedSourcesMapEntriesTupleToEntriesTuple<InferVirtualCustomElementNodeConfigOutputs<GConfig>>,
    );

    if (_extends !== void 0) {
      this.setAttribute('is', name);
    }
  }

  get name(): string {
    return this._name;
  }

  get extends(): string | undefined {
    return this._extends;
  }

  get slots(): IVirtualCustomElementNodeSlotsMap {
    return this._slots;
  }

  get inputs(): ITypedSourcesMap<InferVirtualCustomElementNodeConfigInputs<GConfig>> {
    return this._inputs;
  }

  get outputs(): ITypedSourcesMap<InferVirtualCustomElementNodeConfigOutputs<GConfig>> {
    return this._outputs;
  }

  /* INPUT */

  setReactiveInput<GKey extends InferVirtualCustomElementNodeSetReactiveInputKeys<GConfig>>(
    key: GKey,
    value$: IObservable<InferVirtualCustomElementNodeSetReactiveInputValueFromKey<GConfig, GKey>>,
  ): void {
    this.onConnected$(value$)(this._inputs.$set<GKey>(key));
  }

  /* OUTPUT */

  setReactiveOutput<GKey extends InferVirtualCustomElementNodeSetReactiveOutputKeys<GConfig>>(
    key: GKey,
    $value: IObserver<InferVirtualCustomElementNodeSetReactiveOutputValueFromKey<GConfig, GKey>>,
  ): void {
    type GValue = InferVirtualCustomElementNodeSetReactiveOutputValueFromKey<GConfig, GKey>;
    const observable$ = (
      this._outputs.has(key)
        ? this._outputs.get$<GKey>(key)
        : this._inputs.get$<GKey>(key)
    ) as IObservable<GValue>;
    this.onConnected$(observable$)($value);
  }
}

// export type IGenericGenericVirtualCustomElementNode = VirtualCustomElementNode<HTMLElement, ITypedSourcesMapEntriesTuple>;
// export type IGenericGenericVirtualCustomElementNode = VirtualCustomElementNode<IVirtualCustomElementNodeConfig>;
export type IGenericGenericVirtualCustomElementNode = VirtualCustomElementNode<any>;

/*-------------------*/

// type IGenericIO = readonly [string, ...any[]][];

function verifyInterfacesIntegrity<GConfig extends IVirtualCustomElementNodeConfig>(
  inputs: InferVirtualCustomElementNodeOptionsInputs<GConfig>,
  outputs: InferVirtualCustomElementNodeOptionsOutputs<GConfig>,
): void {
  const interfacesSet = new Set<string>();

  const addInterface = (
    name: string,
    context: string,
  ): void => {
    if (interfacesSet.has(name)) {
      throw new Error(`Interface '${name}' of '${context}' already exists`);
    } else {
      interfacesSet.add(name);
    }
  };

  (inputs as readonly [string][]).forEach(([name]: [string]): void => {
    addInterface(name, 'inputs');
  });

  // TODO
  (outputs as unknown as readonly string[]).forEach((name: string): void => {
    addInterface(name, 'outputs');
  });
}

/*-----------------*/

// interface TestConfig {
//   element: HTMLButtonElement;
//   inputs: [
//     ['i-a', boolean],
//   ],
//   outputs: [
//     ['o-a', number],
//   ],
// }
//
// const a = new VirtualCustomElementNode<TestConfig>({
//   name: 'test',
//   slots: new Map(),
//   inputs: [
//     ['i-a', true],
//   ],
//   outputs: [
//     'o-a',
//   ],
// });
//
// a.inputs.get('i-a');
// a.outputs.get('o-a');
// a.setReactiveInput('i-a', single(true))
// a.setReactiveOutput('i-a', (value: boolean) => {})
// a.setReactiveOutput('o-a', (value: number) => {})
