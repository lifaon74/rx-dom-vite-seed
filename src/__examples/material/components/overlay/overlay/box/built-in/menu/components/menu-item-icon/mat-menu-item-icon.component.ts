import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  VirtualCustomElementNode,
} from '@lirx/dom';

// @ts-ignore
import html from './mat-menu-item-icon.component.html?raw';
// @ts-ignore
import style from './mat-menu-item-icon.component.scss?inline';

/**
 * COMPONENT: 'mat-menu-item'
 */

interface IMatMenuItemIconComponentConfig {
  element: HTMLElement;
}

export type IMatMenuItemIconVirtualCustomElementNode = VirtualCustomElementNode<IMatMenuItemIconComponentConfig>;

export const MatMenuItemIconComponent = createComponent<IMatMenuItemIconComponentConfig>({
  name: 'mat-menu-item-icon',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
  }),
  styles: [compileStyleAsComponentStyle(style)],
});


