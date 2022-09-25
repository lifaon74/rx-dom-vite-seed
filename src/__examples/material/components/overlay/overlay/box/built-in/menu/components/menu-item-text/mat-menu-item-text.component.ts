import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  VirtualCustomElementNode,
} from '@lirx/dom';

// @ts-ignore
import html from './mat-menu-item-text.component.html?raw';
// @ts-ignore
import style from './mat-menu-item-text.component.scss?inline';

/**
 * COMPONENT: 'mat-menu-item'
 */

interface IMatMenuItemTextComponentConfig {
  element: HTMLElement;
}

export type IMatMenuItemTextVirtualCustomElementNode = VirtualCustomElementNode<IMatMenuItemTextComponentConfig>;

export const MatMenuItemTextComponent = createComponent<IMatMenuItemTextComponentConfig>({
  name: 'mat-menu-item-text',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
  }),
  styles: [compileStyleAsComponentStyle(style)],
});


