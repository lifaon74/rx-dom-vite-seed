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
  IGenericComponent,
  IGenericVirtualCustomElementNode,
  IVirtualCustomElementNodeSlotTemplate,
  VirtualDOMNode,
  VirtualRootNode,
} from '@lirx/dom';
import { AppToWebComponentExampleComponent } from './component/to-web-component-example.component';

export function toCustomElement(
  component: IGenericComponent,
): typeof HTMLElement {

  const CustomElement = class extends HTMLElement {

    // static get observedAttributes(): string[] {
    //
    // }

    protected attributeChange$: IObservable<string>;
    protected unsubscribeOfAttributeChange!: IUnsubscribe;
    protected rootNode: VirtualRootNode<HTMLElement>;
    protected node: IGenericVirtualCustomElementNode;

    constructor() {
      super();
      const html: string = this.innerHTML;
      this.innerHTML = '';

      const slots = new Map<string, IVirtualCustomElementNodeSlotTemplate>([
        ['*', (parentNode: VirtualDOMNode): void => {
          throw 'TODO';
        }],
      ]);

      const attributeChange$ = mapFilter$$(
        fromMutationObserver(this, {
          subtree: false,
          childList: false,
          attributes: true,
          characterData: false,
        }),
        (mutation: MutationRecord): IMapFilterMapFunctionReturn<string> => {
          return (mutation.type === 'attributes')
            ? mutation.attributeName as string
            : MAP_FILTER_DISCARD;
        },
      );

      const attribute$ = defer((): IObservable<string> => {
        return fromArray<string>(this.getAttributeNames());
      });

      this.attributeChange$ = merge([
        attribute$,
        attributeChange$,
      ]);

      this.rootNode = new VirtualRootNode<HTMLElement>(this);
      this.node = component.create(slots);
    }

    connectedCallback(): void {
      this.node.attach(this.rootNode);

      this.unsubscribeOfAttributeChange = this.attributeChange$((name: string): void => {
        const value: string | null = this.getAttribute(name);

        if (this.node.inputs.has(name)) {
          this.node.inputs.set(name, value);
        } else if (name in this.node.elementNode) {
          this.node.setProperty(name, value);
        } else {
          this.node.setAttribute(name, value);
        }
      });
    }

    disconnectedCallback(): void {
      this.node.detach();
      this.unsubscribeOfAttributeChange();
    }

    // attributeChangedCallback(): void {
    //   this.node.detach();
    // }
  };

  window.customElements.define(`ce-${component.name}`, CustomElement);

  return CustomElement;
}

export function toWebComponentExample() {
  const AppToWebComponentExampleCustomElement = toCustomElement(AppToWebComponentExampleComponent);

  const tagName: string = `ce-${AppToWebComponentExampleComponent.name}`;

  document.body.innerHTML = `
    <${tagName} value="abc">
      some content
    </${tagName}>
  `;
}
