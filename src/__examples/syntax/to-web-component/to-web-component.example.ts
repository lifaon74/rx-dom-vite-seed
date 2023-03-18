import {
  defer,
  fromArray,
  fromMutationObserver,
  IMapFilterMapFunctionReturn,
  IObservable,
  IUnsubscribe,
  MAP_FILTER_DISCARD,
  mapFilter$$,
  merge,
} from '@lirx/core';
import {
  IComponent,
  IComponentConfig,
  IGenericComponent,
  IGenericVirtualCustomElementNode,
  IVirtualCustomElementNodeSlotTemplate, VirtualCustomElementNode,
  VirtualDOMNode,
  VirtualRootNode,
} from '@lirx/dom';
import { AppToWebComponentExampleComponent } from './component/to-web-component-example.component';

// export function toCustomElement(
//   component: IGenericComponent,
// ): typeof HTMLElement {
//
//   const CustomElement = class extends HTMLElement {
//
//     // static get observedAttributes(): string[] {
//     //
//     // }
//
//     protected attributeChange$: IObservable<string>;
//     protected unsubscribeOfAttributeChange!: IUnsubscribe;
//     protected rootNode: VirtualRootNode<HTMLElement>;
//     protected node: IGenericVirtualCustomElementNode;
//
//     constructor() {
//       super();
//       const html: string = this.innerHTML;
//       this.innerHTML = '';
//
//       const slots = new Map<string, IVirtualCustomElementNodeSlotTemplate>([
//         ['*', (parentNode: VirtualDOMNode): void => {
//           throw 'TODO';
//         }],
//       ]);
//
//       const attributeChange$ = mapFilter$$(
//         fromMutationObserver(this, {
//           subtree: false,
//           childList: false,
//           attributes: true,
//           characterData: false,
//         }),
//         (mutation: MutationRecord): IMapFilterMapFunctionReturn<string> => {
//           return (mutation.type === 'attributes')
//             ? mutation.attributeName as string
//             : MAP_FILTER_DISCARD;
//         },
//       );
//
//       const attribute$ = defer((): IObservable<string> => {
//         return fromArray<string>(this.getAttributeNames());
//       });
//
//       this.attributeChange$ = merge([
//         attribute$,
//         attributeChange$,
//       ]);
//
//       this.rootNode = new VirtualRootNode<HTMLElement>(this);
//       this.node = component.create(slots);
//     }
//
//     connectedCallback(): void {
//       this.node.attach(this.rootNode);
//
//       this.unsubscribeOfAttributeChange = this.attributeChange$((name: string): void => {
//         const value: string | null = this.getAttribute(name);
//
//         if (this.node.inputs.has(name)) {
//           this.node.inputs.set(name, value);
//         } else if (name in this.node.elementNode) {
//           this.node.setProperty(name, value);
//         } else {
//           this.node.setAttribute(name, value);
//         }
//       });
//     }
//
//     disconnectedCallback(): void {
//       this.node.detach();
//       this.unsubscribeOfAttributeChange();
//     }
//
//     // attributeChangedCallback(): void {
//     //   this.node.detach();
//     // }
//   };
//
//   window.customElements.define(`ce-${component.name}`, CustomElement);
//
//   return CustomElement;
// }


export function toCustomElement<GConfig extends IComponentConfig>(
  component: IComponent<GConfig>,
  tagName: string = `${component.name}-wrapper`,
) {

  class CustomElement extends HTMLElement {
    static get tagName(): string {
      return tagName;
    }

    public readonly node: VirtualCustomElementNode<GConfig>;

    protected readonly rootNode: VirtualRootNode<CustomElement>;

    constructor() {
      super();
      this.node = component.create();
      this.rootNode = new VirtualRootNode<CustomElement>(this);
    }

    connectedCallback(): void {
      this.node.attach(this.rootNode);
    }

    disconnectedCallback(): void {
      this.node.detach();
    }
  }

  window.customElements.define(tagName, CustomElement);

  return CustomElement;
}

export function toWebComponentExample() {
  const AppToWebComponentExampleCustomElement = toCustomElement(AppToWebComponentExampleComponent);

  const tagName: string = AppToWebComponentExampleCustomElement.tagName;

  document.body.innerHTML = `
    <${tagName}></${tagName}>
  `;

  const ce = (document.body.firstElementChild as unknown as InstanceType<typeof AppToWebComponentExampleCustomElement>);
  ce.node.inputs.set('value', `Hello world`);
}
