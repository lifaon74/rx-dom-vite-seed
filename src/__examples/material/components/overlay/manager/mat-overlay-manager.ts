import {
  IComponent,
  IGenericVirtualCustomElementNode,
  IVirtualCustomElementNodeConfig, IVirtualCustomElementNodeSlotsMap,
  VirtualCustomElementNode,
  VirtualRootNode,
} from '@lirx/dom';

// @ts-ignore
import style from './mat-overlay-manager.scss?inline';

let matOverlayManagerStyleElementInitialized: boolean = false;

export class MatOverlayManager extends VirtualRootNode<HTMLElement> {

  static create(): MatOverlayManager {
    const matOverlayManagerElement = document.createElement('mat-overlay-manager');
    document.body.appendChild(matOverlayManagerElement);
    return new MatOverlayManager(matOverlayManagerElement);
  }

  constructor(
    element: HTMLElement,
  ) {
    super(element);

    if (!matOverlayManagerStyleElementInitialized) {
      matOverlayManagerStyleElementInitialized = true;
      const styleElement = document.createElement('style');
      styleElement.setAttribute('host', 'mat-overlay-manager');
      styleElement.textContent = style;
      document.head.appendChild(styleElement);
    }

    element.setAttribute('mat-overlay-manager', '');
  }

  open<GConfig extends IVirtualCustomElementNodeConfig>(
    component: IComponent<GConfig>,
    slots?: IVirtualCustomElementNodeSlotsMap,
  ): VirtualCustomElementNode<GConfig> {
    return this.adopt(component.create(slots));
  }

  adopt<GNode extends IGenericVirtualCustomElementNode>(
    node: GNode,
  ): GNode {
    node.attach(this);
    return node;
  }

  has(
    node: IGenericVirtualCustomElementNode,
  ): boolean {
    return (node.parentNode === this);
  }

  close(
    node: IGenericVirtualCustomElementNode,
  ): void {
    if (this.has(node)) {
      node.detach();
    } else {
      throw new Error(`Not a node of this MatOverlayManager`);
    }
  }
}
